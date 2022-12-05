package domain.security.service;

import domain.security.repository.RefreshTokenRepository;
import domain.security.entity.RefreshToken;
import domain.user.dto.response.TokenRefreshResponse;
import domain.user.entity.User;
import domain.user.exception.TokenRefreshException;
import domain.user.repository.UserRepository;
import domain.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    @Value("${REFRESH_EXPIRY}")
    private final Long refreshTokenDurationMs;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(User user) {
        RefreshToken refreshToken =
                new RefreshToken(user, UUID.randomUUID().toString(), Instant.now().plusMillis(refreshTokenDurationMs));

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(),
                    "리프레시토큰이 만료되었습니다.");
        }

        return token;
    }

    @Transactional
    public void deleteByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(refreshTokenRepository::deleteByUser);
    }

    public TokenRefreshResponse refreshJwtToken(String refreshToken) {
        return findByToken(refreshToken).map(this::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateJwtToken(user);
                    return new TokenRefreshResponse(token, refreshToken);
                })
                .orElseThrow(() -> new TokenRefreshException(refreshToken,
                        "refreshToken이 DB에 존재하지 않습니다."));
    }
}
