package gifterz.textme.domain.letter.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import gifterz.textme.domain.letter.entity.Address;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SlowLetterWithAddressRequest(
        String senderName,
        String postCode,
        String address,
        String addressDetail,
        String phoneNumber,
        String contents
) {
    public Address toAddress() {
        return new Address(postCode, address, addressDetail);
    }

    public SenderInfo toSenderInfo() {
        return SenderInfo.of(senderName, phoneNumber);
    }
}
