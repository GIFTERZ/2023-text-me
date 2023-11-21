package gifterz.textme.common.firebase;

import com.google.firebase.messaging.FirebaseMessaging;
import gifterz.textme.domain.user.dto.request.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.google.firebase.messaging.Message;

@Service
@RequiredArgsConstructor
public class FCMService implements NotificationService {

    private final FCMTokenDao fcmTokenDao;

    @Override
    public void sendLetterReceivedNotification(String email) {
        if (!hasKey(email)) {
            return;
        }
        String token = getToken(email);
        Message message = Message.builder()
                .putData("title", "편지 도착 알림")
                .putData("content", "편지가 도착했습니다.")
                .setToken(token)
                .build();
        send(message);
    }

    public void saveToken(LoginRequest loginRequest) {
        fcmTokenDao.saveToken(loginRequest);
    }

    public void deleteToken(String email) {
        fcmTokenDao.deleteToken(email);
    }

    private void send(Message message) {
        FirebaseMessaging.getInstance().sendAsync(message);
    }

    private String getToken(String email) {
        return fcmTokenDao.getToken(email);
    }

    private boolean hasKey(String email) {
        return fcmTokenDao.hasKey(email);
    }
}
