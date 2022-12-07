package gifterz.textme.domain.user.controller;

import gifterz.textme.domain.security.jwt.JwtAuth;
import gifterz.textme.domain.security.service.RefreshTokenService;
import gifterz.textme.domain.user.dto.request.LoginRequest;
import gifterz.textme.domain.user.dto.request.SignUpRequest;
import gifterz.textme.domain.user.dto.request.TokenRefreshRequest;
import gifterz.textme.domain.user.dto.response.LoginResponse;
import gifterz.textme.domain.user.dto.response.TokenRefreshResponse;
import gifterz.textme.domain.user.dto.response.UserResponse;
import gifterz.textme.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> register(@RequestBody @Valid final SignUpRequest request) {
        UserResponse userResponse = userService.signUp(request);
        return ResponseEntity.ok().body(userResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid final LoginRequest request) {
        LoginResponse loginResponse = userService.login(request);
        return ResponseEntity.ok().body(loginResponse);
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<TokenRefreshResponse> refreshToken(@JwtAuth String email,
                                                             @RequestBody @Valid final TokenRefreshRequest request) {
        String token = request.getRefreshToken();
        TokenRefreshResponse tokenRefreshResponse = refreshTokenService.refreshJwtToken(email, token);
        return ResponseEntity.ok().body(tokenRefreshResponse);
    }
}
