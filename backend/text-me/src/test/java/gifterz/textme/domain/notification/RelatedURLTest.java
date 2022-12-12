package gifterz.textme.domain.notification;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class RelatedURLTest {

    @DisplayName("관련 링크가 공백이 아닐 경우 성공")
    @Test
    void url_not_blank() {
        assertThatNoException().isThrownBy(
                () -> new RelatedURL("notify.me/kr"));
    }

    @DisplayName("관련 링크가 공백이면 실패")
    @Test
    void url_blank() {
        assertThatNoException().isThrownBy(
                () -> new RelatedURL(""));
    }
}
