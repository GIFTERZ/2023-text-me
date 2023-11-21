package gifterz.textme.domain.oauth.kakao.dto;

import gifterz.textme.domain.oauth.kakao.entity.KakaoAccount;
import jakarta.persistence.Embedded;

import java.time.LocalDateTime;

public record KakaoMemberResponse (
        Long id,
        boolean hasSignedUp,
        LocalDateTime connectedAt,
        @Embedded
        KakaoAccount kakaoAccount
){
}
