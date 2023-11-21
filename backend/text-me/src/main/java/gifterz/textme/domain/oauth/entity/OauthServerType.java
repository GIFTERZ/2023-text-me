package gifterz.textme.domain.oauth.entity;

import java.util.Locale;

public enum OauthServerType {

    KAKAO,
    ;

    public static OauthServerType fromName(String name) {
        return OauthServerType.valueOf(name.toUpperCase(Locale.ENGLISH));
    }
}
