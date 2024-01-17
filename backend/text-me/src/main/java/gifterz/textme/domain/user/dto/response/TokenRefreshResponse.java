package gifterz.textme.domain.user.dto.response;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TokenRefreshResponse {
    private String accessToken;
    private String refreshToken;
    private LocalDateTime createdAt;
    private final String tokenType = "Bearer";

    public TokenRefreshResponse(String accessToken, String refreshToken, LocalDateTime createdAt) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.createdAt = createdAt;
    }

}
