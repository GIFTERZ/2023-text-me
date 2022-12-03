package domain.user.service;

import domain.security.jwt.JwtUtils;
import domain.security.service.RefreshTokenService;
import domain.user.dto.request.LoginRequest;
import domain.user.dto.request.SignUpRequest;
import domain.user.dto.response.LoginResponse;
import domain.user.dto.response.UserResponse;
import domain.security.entity.Password;
import domain.security.entity.RefreshToken;
import domain.user.entity.User;
import domain.user.exception.EmailDuplicatedException;
import domain.user.exception.UserNotFoundException;
import domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtils jwtUtils;

    @Transactional
    public UserResponse signUp(SignUpRequest signUpRequest) {
        User user = new User(signUpRequest.getName(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword());
        Optional<User> userExists = userRepository.findByEmail(user.getEmail());

        if (userExists.isPresent()) {
            throw new EmailDuplicatedException(user.getEmail());
        }

        Password userPassword = user.getPassword();
        String encodedPassword = bCryptPasswordEncoder.encode(userPassword.getPassword());
        userPassword.setPassword(encodedPassword);

        userRepository.save(user);
        return new UserResponse(user.getName(), user.getEmail());
    }

    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        Optional<User> userExists = userRepository.findByEmail(email);
        if (userExists.isEmpty()) {
            throw new UserNotFoundException();
        }
        User user = userExists.get();
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtUtils.generateJwtToken(user);
        createAccessToken(loginRequest);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        return new LoginResponse(user.getId(), user.getEmail(), user.getName(), accessToken, refreshToken.getId());
    }

    private void createAccessToken(LoginRequest loginRequest) {
        String accessToken = jwtUtils.generateTokenFromSubject(loginRequest.getEmail());
    }

}
