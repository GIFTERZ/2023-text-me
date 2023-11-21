package gifterz.textme.domain.oauth.kakao.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Embeddable
@JsonNaming(SnakeCaseStrategy.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class KakaoAccount {
    private boolean profileNeedsAgreement;
    private boolean profileNicknameNeedsAgreement;
    private boolean profileImageNeedsAgreement;
    @Embedded
    private KakaoProfile profile;
    private boolean nameNeedsAgreement;
    private String name;
    private boolean emailNeedsAgreement;
    private boolean isEmailValid;
    private boolean isEmailVerified;
    private String email;
    private boolean ageRangeNeedsAgreement;
    private String ageRange;
    private boolean birthyearNeedsAgreement;
    private String birthyear;
    private boolean birthdayNeedsAgreement;
    private String birthday;
    private String birthdayType;
    private boolean genderNeedsAgreement;
    private String gender;
    private boolean phoneNumberNeedsAgreement;
    private String phoneNumber;
    private boolean ciNeedsAgreement;
    private String ci;
    private LocalDateTime ciAuthenticatedAt;
}
