package gifterz.textme.domain.user.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("User 엔티티 테스트")
class UserTest {

    @DisplayName("유저 객체 생성 성공")
    @Test
    void create_user() {
        User user = new User("홍길동", "abcd1234@gmail.com", "Qwer1234!");

        assertAll(
                () -> assertThat(user.getName()).isEqualTo("홍길동"),
                () -> assertThat(user.getEmail()).isEqualTo("abcd1234@gmail.com"),
                () -> assertThat(user.getPassword()).isEqualTo("Qwer1234!")
        );
    }

    @DisplayName("유저 이름 변경 성공")
    @Test
    void update_user_name() {
        User user = new User("홍길동", "abcd1234@gmail.com", "Qwer1234!");

        user.updateUserName("아무개");

        assertThat(user.getName()).isEqualTo("아무개");
    }

    @DisplayName("권한 없는 유저 확인")
    @Test
    void is_unauthorized_user() {
        User user1 = new User("홍길동", "abcd1234@gmail.com", "Qwer1234!");
        User user2 = new User("아무개", "efgh5678@naver.com", "ABCD1234!");

        assertThat(user1.isUnAuthorized(user2)).isTrue();
    }
}
