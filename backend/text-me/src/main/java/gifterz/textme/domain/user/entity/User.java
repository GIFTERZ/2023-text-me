package gifterz.textme.domain.user.entity;

import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.entity.StatusType;
import gifterz.textme.domain.user.exception.InvalidPasswordException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.regex.Pattern;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseEntity {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Lob
    @Column(nullable = false)
    private String password;

    public User(String name, String email, String password) {
        super(StatusType.ACTIVATE.getStatus());
        this.name = name;
        this.email = email;
        this.password = password;
    }


    private static void validatePassword(String password) {
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

    public void updateUserName(String name) {
        this.name = name;
    }
}
