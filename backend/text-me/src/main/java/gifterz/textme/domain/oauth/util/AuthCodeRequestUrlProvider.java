package gifterz.textme.domain.oauth.util;

import gifterz.textme.domain.oauth.entity.OauthServerType;

public interface AuthCodeRequestUrlProvider {

    OauthServerType supportServer();

    String provide();
}
