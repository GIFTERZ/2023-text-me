package gifterz.textme.domain.letter.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
public class LetterRequest {
    @NotNull(message = "받는 분 id를 입력해주세요.")
    private Long receiverId;
    @NotBlank(message = "편지 내용을 입력해주세요.")
    private String contents;
    @NotBlank(message = "보내는 분의 원하시는 이름을 입력해주세요.")
    private String senderName;
    @NotBlank(message = "카드 or 사진을 선택해주세요.")
    private String imageUrl;
}
