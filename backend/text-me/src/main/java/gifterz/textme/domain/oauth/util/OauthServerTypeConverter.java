package gifterz.textme.domain.oauth.util;

import gifterz.textme.domain.oauth.entity.AuthType;
import org.springframework.core.convert.converter.Converter;

public class OauthServerTypeConverter implements Converter<String, AuthType> {

    @Override
    public AuthType convert(String source) {
        return AuthType.fromName(source);
    }
}
