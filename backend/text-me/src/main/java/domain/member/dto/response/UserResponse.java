package domain.member.dto.response;

import domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {

    private String userName;
    private String email;

    public UserResponse(Member member) {
        this.userName = member.getName();
        this.email = member.getEmail();
    }
}
