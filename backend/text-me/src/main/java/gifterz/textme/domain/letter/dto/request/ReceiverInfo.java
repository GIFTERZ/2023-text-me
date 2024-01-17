package gifterz.textme.domain.letter.dto.request;

import gifterz.textme.domain.letter.entity.Address;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReceiverInfo {
    private String senderName;
    private String receiverName;
    private Address address;
    private String phoneNumber;
    private String contents;

    public static ReceiverInfo of(String senderName, String receiverName,
                                  Address address, String phoneNumber, String contents) {
        return ReceiverInfo.builder()
                .senderName(senderName)
                .receiverName(receiverName)
                .address(address)
                .phoneNumber(phoneNumber)
                .contents(contents)
                .build();
    }
}
