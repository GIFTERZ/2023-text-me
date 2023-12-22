package gifterz.textme.domain.oauth.entity;

import gifterz.textme.domain.entity.BaseEntity;

import gifterz.textme.domain.entity.StatusType;
import gifterz.textme.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
public class OauthMember extends BaseEntity {

    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    @Embedded
    private OauthId oauthId;

    public static OauthMember of(User user, OauthId oauthId) {
        return new OauthMember(user, oauthId);
    }

    private OauthMember(User user, OauthId oauthId) {
        super(StatusType.ACTIVATE.getStatus());
        this.user = user;
        this.oauthId = oauthId;
    }
}
