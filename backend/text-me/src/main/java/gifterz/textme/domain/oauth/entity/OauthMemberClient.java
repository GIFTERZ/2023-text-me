package gifterz.textme.domain.oauth.entity;

public interface OauthMemberClient {

    AuthType supportServer();

    OauthMember fetchMember(String authCode);
}
