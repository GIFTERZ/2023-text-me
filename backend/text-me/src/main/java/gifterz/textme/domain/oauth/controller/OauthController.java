package gifterz.textme.domain.oauth.controller;

import gifterz.textme.domain.oauth.dto.OauthRequest;
import gifterz.textme.domain.oauth.entity.AuthType;
import gifterz.textme.domain.oauth.service.OauthService;
import gifterz.textme.domain.user.dto.response.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@RequiredArgsConstructor
@RequestMapping("/oauth")
@RestController
public class OauthController {

    private final OauthService oauthService;

    @GetMapping("/{authType}")
    public ResponseEntity<Void> redirectAuthCodeRequestUrl(
            @PathVariable AuthType authType,
            HttpServletResponse response) throws IOException {
        String redirectUrl = oauthService.getAuthCodeRequestUrl(authType);
        response.sendRedirect(redirectUrl);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login/{authType}")
    public ResponseEntity<LoginResponse> login(
            @PathVariable AuthType authType,
            @RequestBody OauthRequest oauthRequest) {
        LoginResponse loginResponse = oauthService.login(authType, oauthRequest);
        return ResponseEntity.ok().body(loginResponse);
    }
}
