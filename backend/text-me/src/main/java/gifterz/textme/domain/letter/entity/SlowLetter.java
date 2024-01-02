package gifterz.textme.domain.letter.entity;

import com.google.firebase.database.annotations.Nullable;
import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.entity.StatusType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @Nullable
    private String email;
    @Embedded
    @Nullable
    private Address address;
    @Nullable
    private String receiverName;
    @Nullable
    String phoneNumber;


    public SlowLetter(String email, String contents) {
        super(StatusType.ACTIVATE.getStatus());
        this.email = email;
        this.contents = contents;
    }

    public SlowLetter(Address address, String contents, String receiverName, String phoneNumber) {
        super(StatusType.ACTIVATE.getStatus());
        this.address = address;
        this.contents = contents;
        this.receiverName = receiverName;
        this.phoneNumber = phoneNumber;
    }

    public static SlowLetter of(String email, String contents) {
        return new SlowLetter(email, contents);
    }

    public static SlowLetter of(Address address, String contents, String receiverName, String phoneNumber) {
        return new SlowLetter(address, contents, receiverName, phoneNumber);
    }
}
