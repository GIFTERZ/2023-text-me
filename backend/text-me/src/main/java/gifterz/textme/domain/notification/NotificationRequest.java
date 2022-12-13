package gifterz.textme.domain.notification;

import gifterz.textme.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class NotificationRequest {

    private User receiver;
    private String content;
    private String url;

    public User getReceiver() {
        return receiver;
    }

    public String getContent() {
        return content;
    }

    public String getUrl() {
        return url;
    }
}
