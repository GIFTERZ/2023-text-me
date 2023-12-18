package gifterz.textme.domain.oauth.kakao.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@JsonNaming(SnakeCaseStrategy.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class KakaoProfile {
    private String nickname;
    private String thumbnailImageUrl;
    private String profileImageUrl;
    private Boolean isDefaultImage;
}
