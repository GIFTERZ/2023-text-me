package gifterz.textme.domain.letter.dto.response;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllLetterResponse {
    private Long id;
    private String receiverName;
    private String imageUrl;
}
