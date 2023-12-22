package gifterz.textme.domain.security.service;

import gifterz.textme.domain.oauth.entity.OauthMember;
import gifterz.textme.domain.oauth.repository.OauthMemberRepository;
import gifterz.textme.domain.security.entity.RefreshToken;
import gifterz.textme.domain.security.jwt.JwtUtils;
import gifterz.textme.domain.security.repository.RefreshTokenRepository;
import gifterz.textme.domain.user.dto.response.TokenRefreshResponse;
import gifterz.textme.domain.user.dto.response.UserResponse;
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
    private final OauthMemberRepository oauthMemberRepository;
    private final JwtUtils jwtUtils;

    public Optional<RefreshToken> findByAccessToken(String token) {
        return refreshTokenRepository.findByAccessToken(token);
    }

    public RefreshToken createRefreshToken(String token) {
        RefreshToken refreshToken =
                new RefreshToken(token, UUID.randomUUID().toString(), Instant.now().plusMillis(refreshTokenDurationMs));

        refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getRefreshToken(),
                    "리프레시토큰이 만료되었습니다.");
        }

        return token;
    }

    public TokenRefreshResponse refreshJwtToken(String email, String token) {
        Optional<User> userExists = userRepository.findByEmail(email);
        if (userExists.isPresent()) {
            Optional<RefreshToken> refreshTokenExist = findByAccessToken(token);
            if (refreshTokenExist.isEmpty()) {
                throw new TokenRefreshException(token,
                        "refreshToken이 DB에 존재하지 않습니다.");
            }
            RefreshToken refreshToken = verifyExpiration(refreshTokenExist.get());
            User user = userExists.get();
            String newToken = jwtUtils.generateJwtToken(user);
            return new TokenRefreshResponse(newToken, refreshToken.getRefreshToken(), refreshToken.getCreatedAt());
        }

        Optional<OauthMember> oauthMemberExists = oauthMemberRepository.findByEmail(email);
        if (oauthMemberExists.isPresent()) {
            Optional<RefreshToken> refreshTokenExist = findByAccessToken(token);
            if (refreshTokenExist.isEmpty()) {
                throw new TokenRefreshException(token,
                        "refreshToken이 DB에 존재하지 않습니다.");
            }
            RefreshToken refreshToken = verifyExpiration(refreshTokenExist.get());
            OauthMember oauthMember = oauthMemberExists.get();
            String newToken = jwtUtils.generateJwtToken(oauthMember);
            return new TokenRefreshResponse(newToken, refreshToken.getRefreshToken(), refreshToken.getCreatedAt());
        }
        throw new UserNotFoundException();
    }
}
