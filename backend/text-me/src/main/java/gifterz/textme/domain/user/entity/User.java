package gifterz.textme.domain.user.entity;

import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.entity.StatusType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.*;

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

    public void setPassword(String encodedPassword) {
        this.password = encodedPassword;
    }

    public void updateUserName(String name) {
        this.name = name;
    }

    public boolean isUnAuthorized(User user) {
        return this != user;
    }
}
