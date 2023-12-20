package gifterz.textme.domain.oauth.kakao.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import gifterz.textme.domain.oauth.kakao.entity.KakaoAccount;
import jakarta.persistence.Embedded;

import java.time.LocalDateTime;

@JsonNaming(SnakeCaseStrategy.class)
public record KakaoMemberResponse(
        Long id,
        LocalDateTime connectedAt,
        @Embedded
        KakaoAccount kakaoAccount
) {
}
