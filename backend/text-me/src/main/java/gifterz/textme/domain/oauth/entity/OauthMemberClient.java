package gifterz.textme.domain.oauth.entity;

public interface OauthMemberClient {

    OauthServerType supportServer();

    OauthMember fetchMember(String authCode);
}
