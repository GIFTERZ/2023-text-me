package gifterz.textme.domain.user.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
public class LoginResponse {

    private String id;
    private String email;
    private String userName;
    private String accessToken;
    private String refreshToken;
    private LocalDateTime createdAt;

    public LoginResponse(String id, String email, String userName,
                         String accessToken, String refreshToken, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.createdAt = createdAt;
    }
}
