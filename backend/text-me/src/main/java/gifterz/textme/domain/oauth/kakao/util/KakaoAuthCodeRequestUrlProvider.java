package gifterz.textme.domain.oauth.kakao.util;

import gifterz.textme.domain.oauth.util.AuthCodeRequestUrlProvider;
import gifterz.textme.domain.oauth.kakao.config.KakaoOauthConfig;
import gifterz.textme.domain.oauth.entity.AuthType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
@Slf4j
public class KakaoAuthCodeRequestUrlProvider implements AuthCodeRequestUrlProvider {

    private final KakaoOauthConfig kakaoOauthConfig;

    @Override
    public AuthType supportServer() {
        return AuthType.KAKAO;
    }

    @Override
    public String provide() {
        return UriComponentsBuilder
                .fromUriString("https://kauth.kakao.com/oauth/authorize")
                .queryParam("client_id", kakaoOauthConfig.clientId())
                .queryParam("redirect_uri", kakaoOauthConfig.redirectUri())
                .queryParam("response_type", "code")
                .queryParam("scope", String.join(" ", kakaoOauthConfig.scope()))
                .toUriString();
    }

}
