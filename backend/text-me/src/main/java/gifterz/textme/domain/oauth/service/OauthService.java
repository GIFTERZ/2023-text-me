package gifterz.textme.domain.oauth.service;

import gifterz.textme.domain.oauth.util.AuthCodeRequestUrlProviderMapper;
import gifterz.textme.domain.oauth.entity.OauthServerType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OauthService {

    private final AuthCodeRequestUrlProviderMapper authCodeRequestUrlProviderMapper;


    public String getAuthCodeRequestUrl(OauthServerType oauthServerType) {
        return authCodeRequestUrlProviderMapper.provide(oauthServerType);
    }

}
