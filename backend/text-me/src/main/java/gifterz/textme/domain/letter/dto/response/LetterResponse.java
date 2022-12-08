package gifterz.textme.domain.letter.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LetterResponse {
    private Long id;
    private String receiverName;
    private String senderName;
    private String contents;
    private String imageUrl;
}
