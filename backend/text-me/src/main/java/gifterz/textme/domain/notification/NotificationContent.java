package gifterz.textme.domain.notification;

import io.jsonwebtoken.lang.Assert;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NotificationContent {

    @Column
    private String content;

    private NotificationContent(String content) {
        Assert.notNull(content);
        this.content = content;
    }

    public static NotificationContent from(String content) {
        Assert.notNull(content);
        validBlankContent(content);
        return new NotificationContent(content);
    }

    private static void validBlankContent(String content) {
        if (content.isBlank() || content.length() > 50) {
            throw new IllegalArgumentException("알림 컨텐트는 0 ~ 50자 이내여야 합니다.");
        }
    }

    public String getContent() {
        return content;
    }
}
