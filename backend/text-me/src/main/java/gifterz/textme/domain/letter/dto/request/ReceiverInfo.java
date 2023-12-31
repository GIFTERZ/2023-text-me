package gifterz.textme.domain.letter.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ReceiverInfo(
        String receiverName,
        String phoneNumber
) {
}
