package gifterz.textme.domain.oauth.service;

import gifterz.textme.domain.oauth.dto.OauthRequest;
import gifterz.textme.domain.oauth.entity.OauthId;
import gifterz.textme.domain.oauth.entity.OauthMember;
import gifterz.textme.domain.oauth.util.AuthCodeRequestUrlProviderMapper;
import gifterz.textme.domain.oauth.entity.OauthServerType;
import gifterz.textme.domain.oauth.util.OauthMemberClientMapper;
import gifterz.textme.domain.security.entity.RefreshToken;
import gifterz.textme.domain.security.jwt.JwtUtils;
import gifterz.textme.domain.security.service.AesUtils;
import gifterz.textme.domain.security.service.RefreshTokenService;
import gifterz.textme.domain.user.dto.response.LoginResponse;
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

    public String getAuthCodeRequestUrl(OauthServerType oauthServerType) {
        return authCodeRequestUrlProviderMapper.provide(oauthServerType);
    }

    public LoginResponse login(OauthServerType oauthServerType, OauthRequest oauthRequest) {
        OauthMember oauthMember = oauthMemberClientMapper.fetch(oauthServerType, oauthRequest.authCode());
        OauthId oauthId = oauthMember.getOauthId();
        Optional<OauthMember> oauthMemberOptional = oauthMemberRepository.findByOauthId(oauthId);
        if (oauthMemberOptional.isEmpty()) {
            oauthMemberRepository.save(oauthMember);
        }
        String accessToken = jwtUtils.generateJwtToken(oauthMember);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(accessToken);
        String encryptedUserId = encryptUserId(oauthMember);
        return new LoginResponse(encryptedUserId, oauthMember.getEmail(), oauthMember.getNickname(), accessToken,
                refreshToken.getId(), refreshToken.getCreatedAt());
    }

    private String encryptUserId(OauthMember user) {
        String userId = String.valueOf(user.getId());
        return aesUtils.encryption(userId);
    }
}
