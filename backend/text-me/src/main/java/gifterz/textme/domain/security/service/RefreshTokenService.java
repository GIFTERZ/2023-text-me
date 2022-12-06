package gifterz.textme.domain.security.service;

import gifterz.textme.domain.security.entity.RefreshToken;
import gifterz.textme.domain.security.jwt.JwtUtils;
import gifterz.textme.domain.security.repository.RefreshTokenRepository;
import gifterz.textme.domain.user.dto.response.TokenRefreshResponse;
import gifterz.textme.domain.user.entity.User;
import gifterz.textme.domain.user.exception.TokenRefreshException;
import gifterz.textme.domain.user.exception.UserNotFoundException;
import gifterz.textme.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    @Value("${security.jwt.token.refreshExpirationMs}")
    private Long refreshTokenDurationMs;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken() {
        RefreshToken refreshToken =
                new RefreshToken(UUID.randomUUID().toString(), Instant.now().plusMillis(refreshTokenDurationMs));

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

    public TokenRefreshResponse refreshJwtToken(String email, String token) {
        Optional<User> userExist = userRepository.findByEmail(email);
        if (userExist.isEmpty()) {
            throw new UserNotFoundException();
        }
        User user = userExist.get();
        Optional<RefreshToken> refreshTokenExist = findByToken(token);
        if (refreshTokenExist.isEmpty()) {
            RefreshToken refreshToken = refreshTokenExist.get();
            throw new TokenRefreshException(refreshToken.getToken(),
                    "refreshToken이 DB에 존재하지 않습니다.");
        }
        RefreshToken refreshToken = verifyExpiration(refreshTokenExist.get());
        String newToken = jwtUtils.generateJwtToken(user);
        return new TokenRefreshResponse(newToken, refreshToken.getToken());

    }
}
