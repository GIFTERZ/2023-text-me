package gifterz.textme.domain.letter.dto.request;

import gifterz.textme.domain.letter.entity.Address;

public record SlowLetterWithAddressRequest(
        String senderName,
        String receiverName,
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
        return SenderInfo.from(senderName);
    }

    public ReceiverInfo toReceiverInfo() {
        return ReceiverInfo.of(senderName, receiverName, toAddress(), phoneNumber, contents);
    }
}
