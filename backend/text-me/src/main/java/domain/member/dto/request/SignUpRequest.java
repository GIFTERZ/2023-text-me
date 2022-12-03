package domain.member.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class SignUpRequest {

    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식이 잘못되었습니다.", regexp = "^[a-zA-Z0-9+-\\\\_.]+@[a-zA-Z0-9-]+\\\\.[a-zA-Z0-9-.]+$")
    private String email;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(message = "비밀번호는 영문 소문자와 숫자를 포함한 10자 ~ 20자의 비밀번호여야 합니다.",
            regexp = "^[a-z0-9]{10,20}$")
    private String password;
}
