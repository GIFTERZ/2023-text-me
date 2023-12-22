package gifterz.textme.domain.oauth.entity;

import java.util.Locale;

public enum AuthType {

    PASSWORD,
    KAKAO,
    ;

    public static AuthType fromName(String name) {
        return AuthType.valueOf(name.toUpperCase(Locale.ENGLISH));
    }
}
