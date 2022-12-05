package domain.user.controller;

import domain.security.service.RefreshTokenService;
import domain.user.dto.request.LoginRequest;
import domain.user.dto.request.SignUpRequest;
import domain.user.dto.request.TokenRefreshRequest;
import domain.user.dto.response.LoginResponse;
import domain.user.dto.response.TokenRefreshResponse;
import domain.user.dto.response.UserResponse;
import domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<TokenRefreshResponse> refreshToken(@RequestBody @Valid final TokenRefreshRequest request) {
        String refreshToken = request.getRefreshToken();
        TokenRefreshResponse tokenRefreshResponse = refreshTokenService.refreshJwtToken(refreshToken);
        return ResponseEntity.ok().body(tokenRefreshResponse);
    }
}
