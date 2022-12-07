package gifterz.textme.domain.user.service;

import gifterz.textme.domain.security.WebSecurityConfig;
import gifterz.textme.domain.security.entity.RefreshToken;
import gifterz.textme.domain.security.jwt.JwtUtils;
import gifterz.textme.domain.security.service.RefreshTokenService;
import gifterz.textme.domain.user.dto.request.LoginRequest;
import gifterz.textme.domain.user.dto.request.SignUpRequest;
import gifterz.textme.domain.user.dto.response.LoginResponse;
import gifterz.textme.domain.user.dto.response.UserResponse;
import gifterz.textme.domain.user.entity.User;
import gifterz.textme.domain.user.exception.EmailDuplicatedException;
import gifterz.textme.domain.user.exception.UserNotFoundException;
import gifterz.textme.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final WebSecurityConfig webSecurityConfig;
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

        String password = user.getPassword();
        PasswordEncoder passwordEncoder = webSecurityConfig.passwordEncoder();
        String encodedPassword = passwordEncoder.encode(password);
        user.setPassword(encodedPassword);

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
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(accessToken);
        return new LoginResponse(user.getId(), user.getEmail(), user.getName(), accessToken, refreshToken.getId());
    }

    public UserResponse findUserInfo(String email) {
        Optional<User> userExists = userRepository.findByEmail(email);
        User user = userExists.orElseThrow(UserNotFoundException::new);
        return new UserResponse(user.getName(), user.getEmail());
    }

    @Transactional
    public UserResponse updateUserName(String email, String name) {
        Optional<User> userExists = userRepository.findByEmail(email);
        User user = userExists.orElseThrow(UserNotFoundException::new);
        user.updateUserName(name);
        return new UserResponse(user.getName(), user.getEmail());
    }
}
