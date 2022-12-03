package domain.user.entity;

import domain.entity.BaseEntity;
import domain.security.entity.Password;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

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
    @Embedded
    @Column(nullable = false, unique = true)
    private Password password;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = new Password(password);
    }
}
