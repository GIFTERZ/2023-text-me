package gifterz.textme.domain.oauth.util;

import gifterz.textme.domain.oauth.entity.OauthMember;
import gifterz.textme.domain.oauth.entity.OauthMemberClient;
import gifterz.textme.domain.oauth.entity.AuthType;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class OauthMemberClientMapper {

    private final Map<AuthType, OauthMemberClient> oauthMemberClients;

    public OauthMemberClientMapper(Set<OauthMemberClient> clients) {
        oauthMemberClients = clients.stream()
                .collect(Collectors.toMap(OauthMemberClient::supportServer, client -> client));
    }

    public OauthMember fetch(AuthType authType, String authCode) {
        return getOauthMemberClient(authType).fetchMember(authCode);
    }

    private OauthMemberClient getOauthMemberClient(AuthType authType) {
        return Optional.ofNullable(oauthMemberClients.get(authType))
                .orElseThrow(() -> new RuntimeException("지원하지 않는 소셜 로그인입니다."));
    }

}
