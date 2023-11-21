package gifterz.textme.domain.oauth.entity;

import gifterz.textme.domain.oauth.entity.OauthServerType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class OauthId {

    @Column(nullable = false, name = "oauth_server_id")
    private Long oauthServerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "oauth_server")
    private OauthServerType oauthServerType;

    public static OauthId of(Long oauthServerId, OauthServerType oauthServerType) {
        return new OauthId(oauthServerId, oauthServerType);
    }

    private OauthId(Long oauthServerId, OauthServerType oauthServerType) {
        this.oauthServerId = oauthServerId;
        this.oauthServerType = oauthServerType;
    }
}
