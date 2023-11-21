package gifterz.textme.domain.oauth.kakao.service;

import gifterz.textme.domain.oauth.entity.OauthId;
import gifterz.textme.domain.oauth.entity.OauthMember;
import gifterz.textme.domain.oauth.entity.OauthMemberClient;
import gifterz.textme.domain.oauth.entity.OauthServerType;
import gifterz.textme.domain.oauth.kakao.config.KakaoOauthConfig;
import gifterz.textme.domain.oauth.kakao.controller.KakaoApi;
import gifterz.textme.domain.oauth.kakao.dto.KakaoMemberResponse;
import gifterz.textme.domain.oauth.kakao.entity.KakaoAccount;
import gifterz.textme.domain.oauth.kakao.entity.KakaoProfile;
import gifterz.textme.domain.oauth.kakao.entity.KakaoToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;


import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

@Component
@RequiredArgsConstructor
public class KakaoMemberClient implements OauthMemberClient {
    private final KakaoApi kakaoApi;
    private final KakaoOauthConfig kakaoOauthConfig;

    @Override
    public OauthServerType supportServer() {
        return OauthServerType.KAKAO;
    }

    @Override
    public OauthMember fetchMember(String authCode) {
        KakaoToken kakaoToken = fetchKakaoToken(authCode);
        String bearerToken = "Bearer" + kakaoToken.accessToken();
        KakaoMemberResponse response = kakaoApi.fetchMemberInfo(bearerToken, APPLICATION_FORM_URLENCODED_VALUE);
        OauthId oauthId = OauthId.of(response.id(), OauthServerType.KAKAO);
        KakaoAccount kakaoAccount = response.kakaoAccount();
        KakaoProfile kakaoProfile = kakaoAccount.getProfile();
        return OauthMember.of(oauthId, kakaoAccount.getEmail(), kakaoProfile.getNickname());
    }

    private KakaoToken fetchKakaoToken(String authCode) {
        MultiValueMap<String, String> params = getParamForKakaoToken(authCode);
        return kakaoApi.fetchToken(APPLICATION_FORM_URLENCODED_VALUE, params);
    }

    private MultiValueMap<String, String> getParamForKakaoToken(String authCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoOauthConfig.clientId());
        params.add("redirect_uri", kakaoOauthConfig.redirectUri());
        params.add("client_secret", kakaoOauthConfig.clientSecret());
        params.add("code", authCode);
        return params;
    }
}
