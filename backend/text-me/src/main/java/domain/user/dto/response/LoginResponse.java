package domain.user.dto.response;

import domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private Long id;
    private String email;
    private String userName;
    private String token;
    private Long refreshTokenId;

}
