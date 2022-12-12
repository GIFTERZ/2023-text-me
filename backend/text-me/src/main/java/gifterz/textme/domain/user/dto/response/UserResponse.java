package gifterz.textme.domain.user.dto.response;

import lombok.Getter;

@Getter
public class UserResponse {

    private final String id;
    private final String userName;
    private final String email;

    public UserResponse(String id, String userName, String email) {
        this.id = id;
        this.userName = userName;
        this.email = email;
    }
}
