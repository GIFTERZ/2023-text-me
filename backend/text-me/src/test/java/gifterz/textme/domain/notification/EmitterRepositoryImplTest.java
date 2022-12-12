package gifterz.textme.domain.notification;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

import static org.assertj.core.api.Assertions.*;

class EmitterRepositoryImplTest {

    private EmitterRepository emitterRepository = new EmitterRepositoryImpl();
    private Long DEFAULT_TIMEOUT = 60L * 1000L * 60L;

    @DisplayName("새로운 Emitter를 추가")
    @Test
    void save_emitter() {
        Long userId = 1L;
        String emitterId = userId + "_" + System.currentTimeMillis();
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

        assertThatNoException().isThrownBy(() -> emitterRepository.save(emitterId, sseEmitter));
    }

    @DisplayName("한 회원이 접속한 모든 Emitter를 찾는다")
    @Test
    void find_all_emitter_starts_with_userId() throws Exception {
        Long userId = 1L;
        String emitterId1 = userId + "_" + System.currentTimeMillis();
        emitterRepository.save(emitterId1, new SseEmitter(DEFAULT_TIMEOUT));

        Thread.sleep(100);
        String emitterId2 = userId + "_" + System.currentTimeMillis();
        emitterRepository.save(emitterId2, new SseEmitter(DEFAULT_TIMEOUT));

        Thread.sleep(100);
        String emitterId3 = userId + "_" + System.currentTimeMillis();
        emitterRepository.save(emitterId3, new SseEmitter(DEFAULT_TIMEOUT));

        Map<String, SseEmitter> actualResult = emitterRepository.findAllEmitterStartWithByUserId(String.valueOf(userId));

        assertThat(actualResult.size()).isEqualTo(3);
    }

    @DisplayName("저장된 모든 Emitter를 제거한다.")
    @Test
    void delete_all_emitter_start_with_id() throws Exception {
        Long userId = 1L;
        String emitterId1 = userId + "_" + System.currentTimeMillis();
        emitterRepository.save(emitterId1, new SseEmitter(DEFAULT_TIMEOUT));

        Thread.sleep(100);
        String emitterId2 = userId + "_" + System.currentTimeMillis();
        emitterRepository.save(emitterId2, new SseEmitter(DEFAULT_TIMEOUT));

        emitterRepository.deleteAllEmitterStartWithId(String.valueOf(userId));

        assertThat(emitterRepository.findAllEmitterStartWithByUserId(String.valueOf(userId)).size()).isEqualTo(0);
    }
}
