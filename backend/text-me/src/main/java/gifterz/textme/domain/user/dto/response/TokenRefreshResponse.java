package gifterz.textme.domain.user.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TokenRefreshResponse {
    private String accessToken;
    private String refreshToken;
    private LocalDateTime createdAt;
    private String tokenType = "Bearer";

    public TokenRefreshResponse(String accessToken, String refreshToken, LocalDateTime createdAt) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.createdAt = createdAt;
    }

}
