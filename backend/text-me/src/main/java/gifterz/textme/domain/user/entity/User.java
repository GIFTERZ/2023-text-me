package gifterz.textme.domain.user.entity;

import gifterz.textme.domain.oauth.entity.AuthType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private AuthType authType;

    public static User of(String email, String name, AuthType authType) {
        return new User(email, name, authType);
    }

    private User(String email, String name, AuthType authType) {
        this.email = email;
        this.name = name;
        this.authType = authType;
    }

    public void updateUserName(String name) {
        this.name = name;
    }

    public boolean isUnAuthorized(User user) {
        return this != user;
    }
}
