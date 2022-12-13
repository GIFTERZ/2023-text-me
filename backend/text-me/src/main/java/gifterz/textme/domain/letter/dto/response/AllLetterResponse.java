package gifterz.textme.domain.letter.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AllLetterResponse {
    private Long id;
    private String receiverName;
    private String imageUrl;
}
