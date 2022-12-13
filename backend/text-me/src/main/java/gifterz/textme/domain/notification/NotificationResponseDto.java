package gifterz.textme.domain.notification;

public class NotificationResponseDto {

    private Notification notification;

    private NotificationResponseDto(Notification notification) {
        this.notification = notification;
    }

    public static NotificationResponseDto create(Notification notification) {
        return new NotificationResponseDto(notification);
    }
}
