package gifterz.textme.domain.user.service;

import gifterz.textme.domain.oauth.entity.OauthMember;
import gifterz.textme.domain.oauth.repository.OauthMemberRepository;
import gifterz.textme.domain.security.WebSecurityConfig;
import gifterz.textme.domain.security.entity.RefreshToken;
import gifterz.textme.domain.security.jwt.JwtUtils;
import gifterz.textme.domain.security.service.AesUtils;
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
    private final OauthMemberRepository oauthMemberRepository;
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
        Optional<OauthMember> oauthMemberExists = oauthMemberRepository.findByEmail(email);
        if (userExists.isPresent()) {
            throw new EmailDuplicatedException(email);
        }
        if (oauthMemberExists.isPresent()) {
            OauthMember oauthMember = oauthMemberExists.get();
            throw new EmailDuplicatedException(oauthMember.getEmail());
        }

        PasswordEncoder passwordEncoder = webSecurityConfig.passwordEncoder();
        String encodedPassword = passwordEncoder.encode(password);
        User user = User.of(name, email, encodedPassword);
        userRepository.save(user);
        String encryptedUserId = encryptUserEmail(user);
        return new UserResponse(encryptedUserId, user.getName(), user.getEmail());
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
        String encryptedUserId = encryptUserEmail(user);
        return new LoginResponse(encryptedUserId, user.getEmail(), user.getName(), accessToken,
                refreshToken.getId(), refreshToken.getCreatedAt());
    }

    public UserResponse findUserInfo(String email) {
        Optional<User> userExists = userRepository.findByEmail(email);
        if (userExists.isPresent()) {
            User user = userExists.get();
            String encryptedUserId = encryptUserEmail(user);
            return new UserResponse(encryptedUserId, user.getName(), user.getEmail());
        }

        Optional<OauthMember> oauthMemberExists = oauthMemberRepository.findByEmail(email);
        if (oauthMemberExists.isPresent()) {
            OauthMember oauthMember = oauthMemberExists.get();
            String encryptedUserId = encryptUserEmail(oauthMember);
            return new UserResponse(encryptedUserId, oauthMember.getNickname(), oauthMember.getEmail());
        }
        throw new UserNotFoundException();
    }

    @Transactional
    public UserResponse updateUserName(String email, String name) {
        Optional<User> userExists = userRepository.findByEmail(email);
        if (userExists.isPresent()) {
            User user = userExists.get();
            user.updateUserName(name);
            String encryptedText = encryptUserEmail(user);
            return new UserResponse(encryptedText, user.getName(), user.getEmail());
        }

        Optional<OauthMember> oauthMemberExists = oauthMemberRepository.findByEmail(email);
        if (oauthMemberExists.isPresent()) {
            OauthMember oauthMember = oauthMemberExists.get();
            oauthMember.updateName(name);
            String encryptedUserId = encryptUserEmail(oauthMember);
            return new UserResponse(encryptedUserId, oauthMember.getNickname(), oauthMember.getEmail());
        }
        throw new UserNotFoundException();
    }

    public UserResponse findUserInfoByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        String encryptedUserId = encryptUserEmail(user);
        return new UserResponse(encryptedUserId, user.getName(), user.getEmail());
    }

    public UserResponse findUserInfoByUserId(String encryptedId) {
        String userEmail = aesUtils.decrypt(encryptedId);
        User user = userRepository.findByEmail(userEmail).orElseThrow(UserNotFoundException::new);
        return new UserResponse(encryptedId, user.getName(), user.getEmail());
    }

    private String encryptUserEmail(User user) {
        String userEmail = String.valueOf(user.getEmail());
        return aesUtils.encrypt(userEmail);
    }

    private String encryptUserEmail(OauthMember oauthMember) {
        String userEmail = String.valueOf(oauthMember.getEmail());
        return aesUtils.encrypt(userEmail);
    }
}
