package gifterz.textme.domain.notification;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class NotificationContentTest {

    @DisplayName("알림은 50자 이내여야 한다.")
    @Test
    void alarm_words_count() {
        assertThatNoException().isThrownBy(
                () -> NotificationContent.from("hi".repeat(2)));
    }

    @DisplayName("알림 50자 초과시 실패")
    @Test
    void alarm_over_50() {
        assertThatIllegalArgumentException().isThrownBy(
                () -> NotificationContent.from("hi".repeat(30)));
    }

    @DisplayName("알림 내용이 공백일 경우 실패")
    @Test
    void alarm_empty() {
        assertThatIllegalArgumentException().isThrownBy(
                () -> NotificationContent.from("")
        );
    }
}
