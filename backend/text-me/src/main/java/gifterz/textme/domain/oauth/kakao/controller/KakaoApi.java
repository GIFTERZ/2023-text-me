package gifterz.textme.domain.oauth.kakao.controller;

import gifterz.textme.domain.oauth.kakao.dto.KakaoMemberResponse;
import gifterz.textme.domain.oauth.kakao.entity.KakaoToken;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;


public interface KakaoApi {

    @PostExchange(url = "/oauth/token", contentType = APPLICATION_FORM_URLENCODED_VALUE)
    KakaoToken fetchToken(@RequestHeader String contentType, @RequestParam Map params);

    @GetExchange(url = "/v2/user/me")
    KakaoMemberResponse fetchMemberInfo(@RequestHeader String authorization, @RequestHeader String contentType);

}
