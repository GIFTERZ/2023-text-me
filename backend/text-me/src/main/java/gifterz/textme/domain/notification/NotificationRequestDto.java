package gifterz.textme.domain.notification;

import gifterz.textme.domain.user.entity.User;

public class NotificationRequestDto {

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
