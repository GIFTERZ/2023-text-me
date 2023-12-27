package gifterz.textme.domain.user.entity;

import gifterz.textme.domain.oauth.entity.AuthType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("User 엔티티 테스트")
class UserTest {

    @DisplayName("유저 객체 생성 성공")
    @Test
    void create_user() {
        User user = User.of( "abcd1234@gmail.com", "홍길동", AuthType.PASSWORD);

        assertAll(
                () -> assertThat(user.getName()).isEqualTo("홍길동"),
                () -> assertThat(user.getEmail()).isEqualTo("abcd1234@gmail.com"),
                () -> assertThat(user.getAuthType()).isEqualTo(AuthType.PASSWORD)
        );
    }

    @DisplayName("유저 이름 변경 성공")
    @Test
    void update_user_name() {
        User user = User.of( "abcd1234@gmail.com", "홍길동", AuthType.PASSWORD);

        user.updateUserName("아무개");

        assertThat(user.getName()).isEqualTo("아무개");
    }

    @DisplayName("권한 없는 유저 확인")
    @Test
    void is_unauthorized_user() {
        User user1 = User.of( "abcd1234@gmail.com", "홍길동", AuthType.PASSWORD);
        User user2 = User.of( "eafgrg@naver.com", "홍길동", AuthType.PASSWORD);

        assertThat(user1.isUnAuthorized(user2)).isTrue();
    }
}
