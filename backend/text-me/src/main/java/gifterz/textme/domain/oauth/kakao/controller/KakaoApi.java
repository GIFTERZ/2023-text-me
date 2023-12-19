package gifterz.textme.domain.oauth.kakao.controller;

import gifterz.textme.domain.oauth.kakao.dto.KakaoMemberResponse;
import gifterz.textme.domain.oauth.kakao.entity.KakaoToken;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;


import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;


public interface KakaoApi {

    @PostExchange(url = "https://kauth.kakao.com/oauth/token", contentType = APPLICATION_FORM_URLENCODED_VALUE)
    KakaoToken fetchToken(@RequestBody MultiValueMap<String, String> params);

    @GetExchange(url = "https://kapi.kakao.com/v2/user/me")
    KakaoMemberResponse fetchMemberInfo(@RequestHeader(name = "Authorization") String authorization,
                                        @RequestHeader(name = "Content-type") String contentType);
}
