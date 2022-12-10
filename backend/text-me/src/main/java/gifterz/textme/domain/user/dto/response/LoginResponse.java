package gifterz.textme.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private Long id;
    private String email;
    private String userName;
    private String token;
    private Long refreshTokenId;
    private LocalDateTime createdAt;
}
