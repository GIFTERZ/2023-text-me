package domain.user.dto.response;

import domain.user.entity.User;
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
