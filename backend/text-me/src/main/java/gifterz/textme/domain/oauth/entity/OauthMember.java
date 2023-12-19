package gifterz.textme.domain.oauth.entity;

import gifterz.textme.domain.entity.BaseEntity;

import gifterz.textme.domain.entity.StatusType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Getter
public class OauthMember extends BaseEntity {

    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private OauthId oauthId;
    private String email;
    private String nickname;

    public static OauthMember of(OauthId oauthId, String email, String nickname) {
        return new OauthMember(oauthId, email, nickname);
    }

    private OauthMember(OauthId oauthId, String email, String nickname) {
        super(StatusType.ACTIVATE.getStatus());
        this.oauthId = oauthId;
        this.email = email;
        this.nickname = nickname;
    }
}
