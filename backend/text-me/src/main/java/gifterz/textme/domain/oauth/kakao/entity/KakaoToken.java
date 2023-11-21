package gifterz.textme.domain.oauth.kakao.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;


@JsonNaming(SnakeCaseStrategy.class)
public record KakaoToken(
        String tokenType,
        String accessToken,
        String expiresIn,
        String refreshToken,
        String refreshTokenExpiresIn,
        String scope
) {
}
