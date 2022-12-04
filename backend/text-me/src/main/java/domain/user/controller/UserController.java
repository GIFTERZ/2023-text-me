package domain.user.controller;

import domain.user.dto.request.LoginRequest;
import domain.user.dto.request.SignUpRequest;
import domain.user.dto.response.LoginResponse;
import domain.user.dto.response.UserResponse;
import domain.user.service.UserService;
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
}
