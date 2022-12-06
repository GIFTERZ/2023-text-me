package gifterz.textme.domain.user.dto.response;

import gifterz.textme.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {

    private String userName;
    private String email;

    public UserResponse(User user) {
        this.userName = user.getName();
        this.email = user.getEmail();
    }
}
