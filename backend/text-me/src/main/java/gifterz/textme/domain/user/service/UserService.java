package gifterz.textme.domain.user.service;

import gifterz.textme.domain.oauth.entity.AuthType;
import gifterz.textme.domain.security.WebSecurityConfig;
import gifterz.textme.domain.security.entity.RefreshToken;
import gifterz.textme.domain.security.jwt.JwtUtils;
import gifterz.textme.domain.security.service.AesUtils;
import gifterz.textme.domain.security.service.RefreshTokenService;
import gifterz.textme.domain.user.dto.request.LoginRequest;
import gifterz.textme.domain.user.dto.request.SignUpRequest;
import gifterz.textme.domain.user.dto.response.LoginResponse;
import gifterz.textme.domain.user.dto.response.UserResponse;
import gifterz.textme.domain.user.entity.Member;
import gifterz.textme.domain.user.entity.User;
import gifterz.textme.domain.user.exception.EmailDuplicatedException;
import gifterz.textme.domain.user.exception.UserNotFoundException;
import gifterz.textme.domain.user.repository.MemberRepository;
import gifterz.textme.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final WebSecurityConfig webSecurityConfig;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtils jwtUtils;
    private final AesUtils aesUtils;

    @Transactional
    public UserResponse signUp(SignUpRequest signUpRequest) {
        String email = signUpRequest.getEmail();
        String password = signUpRequest.getPassword();
        String name = signUpRequest.getName();
        Optional<User> userExists = userRepository.findByEmail(email);
        checkEmailDuplicated(userExists, email);

        User user = User.of(email, name, AuthType.PASSWORD);
        PasswordEncoder passwordEncoder = webSecurityConfig.passwordEncoder();
        String encodedPassword = passwordEncoder.encode(password);
        Member member = Member.of(user, encodedPassword);
        userRepository.save(user);
        memberRepository.save(member);
        String encryptedUserId = encryptUserId(user.getId());
        return new UserResponse(encryptedUserId, user.getName(), user.getEmail());
    }

    private void checkEmailDuplicated(Optional<User> userExists, String email) {
        if (userExists.isPresent()) {
            User user = userExists.get();
            if (user.getAuthType() == AuthType.PASSWORD) {
                throw new EmailDuplicatedException(email);
            }
        }
    }

    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(authentication);

        String accessToken = jwtUtils.generateJwtToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(accessToken);
        String encryptedUserId = encryptUserId(user.getId());
        return new LoginResponse(encryptedUserId, user.getEmail(), user.getName(), accessToken,
                refreshToken.getId(), refreshToken.getCreatedAt());
    }

    public UserResponse findUserInfo(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        String encryptedUserId = encryptUserId(user.getId());
        return new UserResponse(encryptedUserId, user.getName(), user.getEmail());
    }

    @Transactional
    public UserResponse updateUserName(String email, String name) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        user.updateUserName(name);
        String encryptedUserId = encryptUserId(user.getId());
        return new UserResponse(encryptedUserId, user.getName(), user.getEmail());
    }

    @Transactional(readOnly = true)
    public UserResponse findUserInfoByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        String encryptedUserId = encryptUserId(user.getId());
        return new UserResponse(encryptedUserId, user.getName(), user.getEmail());
    }

    @Transactional(readOnly = true)
    public UserResponse findUserInfoByUserId(String encryptedId) {
        String userId = aesUtils.decrypt(encryptedId);
        User user = userRepository.findById(Long.parseLong(userId)).orElseThrow(UserNotFoundException::new);
        return new UserResponse(encryptedId, user.getName(), user.getEmail());
    }

    private String encryptUserId(Long id) {
        String userId = id.toString();
        return aesUtils.encrypt(userId);
    }
}
