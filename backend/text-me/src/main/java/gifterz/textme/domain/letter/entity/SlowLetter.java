package gifterz.textme.domain.letter.entity;

import com.google.firebase.database.annotations.Nullable;
import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.entity.StatusType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SlowLetter extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String contents;
    private String senderName;

    @Nullable
    private String email;
    @Embedded
    @Nullable
    private Address address;
    @Nullable
    private String receiverName;
    @Nullable
    private String phoneNumber;
    @Nullable
    private String imageUrl;

    public SlowLetter(String email, String senderName, String imageUrl, String contents) {
        super(StatusType.ACTIVATE.getStatus());
        this.email = email;
        this.senderName = senderName;
        this.imageUrl = imageUrl;
        this.contents = contents;
    }

    public SlowLetter(Address address, String contents, String senderName, String receiverName, String phoneNumber) {
        super(StatusType.ACTIVATE.getStatus());
        this.address = address;
        this.contents = contents;
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.phoneNumber = phoneNumber;
    }

    public static SlowLetter of(String email, String senderName, String imageUrl, String contents) {
        return new SlowLetter(email, senderName, imageUrl, contents);
    }

    public static SlowLetter of(Address address, String contents,
                                String senderName, String receiverName, String phoneNumber) {
        return new SlowLetter(address, contents, senderName, receiverName, phoneNumber);
    }
}
