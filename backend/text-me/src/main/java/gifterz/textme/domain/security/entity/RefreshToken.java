package gifterz.textme.domain.security.entity;

import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.entity.StatusType;
import gifterz.textme.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken extends BaseEntity {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private User user;
    @Column(length = 50, nullable = false, unique = true)
    private String refreshToken;

    @Column(nullable = false)
    private Instant expiryDate;

    public RefreshToken(User user , String refreshToken, Instant expiryDate) {
        super(StatusType.ACTIVATE.getStatus());
        this.user = user;
        this.refreshToken = refreshToken;
        this.expiryDate = expiryDate;
    }
}
