package gifterz.textme.domain.letter.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SenderInfo {
    private final String senderName;
    private String imageUrl;
    private String phoneNumber;
    private String email;

    public static SenderInfo of(String senderName, String phoneNumber) {
        return SenderInfo.builder()
                .senderName(senderName)
                .phoneNumber(phoneNumber)
                .build();
    }

    public static SenderInfo of(String email, String senderName, String imageUrl) {
        return SenderInfo.builder()
                .email(email)
                .senderName(senderName)
                .imageUrl(imageUrl)
                .build();
    }
}
