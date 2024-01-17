package gifterz.textme.domain.oauth.service;

import gifterz.textme.domain.oauth.dto.OauthRequest;
import gifterz.textme.domain.oauth.entity.OauthId;
import gifterz.textme.domain.oauth.entity.OauthMember;
import gifterz.textme.domain.oauth.util.AuthCodeRequestUrlProviderMapper;
import gifterz.textme.domain.oauth.entity.AuthType;
import gifterz.textme.domain.oauth.util.OauthMemberClientMapper;
import gifterz.textme.domain.security.entity.RefreshToken;
import gifterz.textme.domain.security.jwt.JwtUtils;
import gifterz.textme.domain.security.service.AesUtils;
import gifterz.textme.domain.security.service.RefreshTokenService;
import gifterz.textme.domain.user.dto.response.LoginResponse;
import gifterz.textme.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import gifterz.textme.domain.oauth.repository.OauthMemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OauthService {

    private final AuthCodeRequestUrlProviderMapper authCodeRequestUrlProviderMapper;
    private final OauthMemberRepository oauthMemberRepository;
    private final OauthMemberClientMapper oauthMemberClientMapper;
    private final JwtUtils jwtUtils;
    private final AesUtils aesUtils;
    private final RefreshTokenService refreshTokenService;

    public String getAuthCodeRequestUrl(AuthType authType) {
        return authCodeRequestUrlProviderMapper.provide(authType);
    }

    public LoginResponse login(AuthType authType, OauthRequest oauthRequest) {
        OauthMember oauthMember = oauthMemberClientMapper.fetch(authType, oauthRequest.authCode());
        OauthId oauthId = oauthMember.getOauthId();
        Optional<OauthMember> oauthMemberOptional = oauthMemberRepository.findByOauthId(oauthId);
        if (oauthMemberOptional.isEmpty()) {
            oauthMemberRepository.save(oauthMember);
        }
        User user = oauthMember.getUser();
        String email = user.getEmail();
        String accessToken = jwtUtils.generateAccessToken(email);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        String encryptedUserId = encryptUserId(user.getId());
        return new LoginResponse(encryptedUserId, user.getEmail(), user.getName(), accessToken,
                refreshToken.getRefreshToken(), refreshToken.getCreatedAt());
    }

    private String encryptUserId(Long id) {
        String userId = id.toString();
        return aesUtils.encrypt(userId);
    }
}
