package gifterz.textme.domain.oauth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OauthId {

    @Column(nullable = false, name = "oauth_server_id")
    private Long oauthServerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "oauth_server")
    private AuthType authType;

    public static OauthId of(Long oauthServerId, AuthType authType) {
        return new OauthId(oauthServerId, authType);
    }

    private OauthId(Long oauthServerId, AuthType authType) {
        this.oauthServerId = oauthServerId;
        this.authType = authType;
    }
}
