package domain.security.entity;

import domain.user.exception.InvalidPasswordException;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.regex.Pattern;

@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Password {
    private String password;

    public Password(String password) {
        validate(password);
        this.password = password;
    }

    private static void validate(String password) {
        String REGEX = "^[a-z0-9]{10,20}$";
        checkSize(password);
        checkArgument(Pattern.matches(REGEX, password));
    }

    private static void checkSize(String password) {
        if (password.isBlank() || password.length() < 8 || password.length() > 12) {
            throw new IllegalArgumentException("Invalid Password");
        }
    }

    private static void checkArgument(boolean matches) {
        if (!matches) {
            throw new IllegalArgumentException("Invalid Password");
        }
    }

    public void checkSamePassword(String password) {
        if (!this.password.equals(password)) {
            throw new InvalidPasswordException("Incorrect Password");
        }
    }

    public void setPassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}
