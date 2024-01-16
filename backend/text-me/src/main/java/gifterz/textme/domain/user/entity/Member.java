package gifterz.textme.domain.user.entity;

import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.entity.StatusType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(length = 15, nullable = false)
    private String password;

    private Member(User user, String password) {
        super(StatusType.ACTIVATE.getStatus());
        this.user = user;
        this.password = password;
    }

    public static Member of(User user, String password) {
        return new Member(user, password);
    }
}
