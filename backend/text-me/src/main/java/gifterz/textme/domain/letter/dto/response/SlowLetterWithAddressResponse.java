package gifterz.textme.domain.letter.dto.response;

import gifterz.textme.domain.letter.dto.request.ReceiverInfo;
import gifterz.textme.domain.letter.entity.Address;

public record SlowLetterWithAddressResponse(
        Address address,
        ReceiverInfo receiverInfo,
        String contents
) {
}
