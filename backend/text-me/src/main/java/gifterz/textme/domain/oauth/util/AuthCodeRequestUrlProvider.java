package gifterz.textme.domain.oauth.util;

import gifterz.textme.domain.oauth.entity.AuthType;

public interface AuthCodeRequestUrlProvider {

    AuthType supportServer();

    String provide();
}
