package gifterz.textme.domain.oauth.util;

import gifterz.textme.domain.oauth.entity.AuthType;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AuthCodeRequestUrlProviderMapper {

    private final Map<AuthType, AuthCodeRequestUrlProvider> authCodeProviders;

    public AuthCodeRequestUrlProviderMapper(Set<AuthCodeRequestUrlProvider> providers) {;
        authCodeProviders = providers.stream()
                .collect(Collectors.toMap(AuthCodeRequestUrlProvider::supportServer, provider -> provider));
    }

    public String provide(AuthType authType) {
        return getAuthCodeRequestUrlProvider(authType).provide();
    }

    private AuthCodeRequestUrlProvider getAuthCodeRequestUrlProvider(AuthType authType) {
        return Optional.ofNullable(authCodeProviders.get(authType))
                .orElseThrow(() -> new RuntimeException("지원하지 않는 소셜 로그인 타입입니다."));
    }
}
