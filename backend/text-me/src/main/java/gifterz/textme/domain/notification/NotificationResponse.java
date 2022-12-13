package gifterz.textme.domain.notification;

public class NotificationResponse {

    private Notification notification;

    private NotificationResponse(Notification notification) {
        this.notification = notification;
    }

    public static NotificationResponse create(Notification notification) {
        return new NotificationResponse(notification);
    }
}
