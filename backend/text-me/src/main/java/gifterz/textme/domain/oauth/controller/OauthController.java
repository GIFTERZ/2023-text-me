package gifterz.textme.domain.oauth.controller;

import gifterz.textme.domain.oauth.dto.OauthRequest;
import gifterz.textme.domain.oauth.entity.OauthServerType;
import gifterz.textme.domain.oauth.service.OauthService;
import gifterz.textme.domain.user.dto.response.LoginResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@RequiredArgsConstructor
@RequestMapping("/oauth")
@RestController
public class OauthController {

    private final OauthService oauthService;

    @GetMapping("/{oauthServerType}")
    public ResponseEntity<Void> redirectAuthCodeRequestUrl(
            @PathVariable OauthServerType oauthServerType,
            HttpServletResponse response) throws IOException {
        String redirectUrl = oauthService.getAuthCodeRequestUrl(oauthServerType);
        response.sendRedirect(redirectUrl);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login/{oauthServerType}")
    public ResponseEntity<LoginResponse> login(
            @PathVariable OauthServerType oauthServerType,
            @RequestBody OauthRequest oauthRequest) {
        LoginResponse loginResponse = oauthService.login(oauthServerType, oauthRequest);
        return ResponseEntity.ok().body(loginResponse);
    }
}
