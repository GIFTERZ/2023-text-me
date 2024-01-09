package gifterz.textme.domain.letter.dto.response;

import gifterz.textme.domain.letter.dto.request.SenderInfo;
import gifterz.textme.domain.letter.entity.Address;

public record SlowLetterWithAddressResponse(
        Address address,
        SenderInfo senderInfo,
        String contents
) {
}
