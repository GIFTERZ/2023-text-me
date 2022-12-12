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
    private String token;
    private Long refreshTokenId;
    private LocalDateTime createdAt;

    public LoginResponse(String id, String email, String userName, String token, Long refreshTokenId, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.token = token;
        this.refreshTokenId = refreshTokenId;
        this.createdAt = createdAt;
    }
}
