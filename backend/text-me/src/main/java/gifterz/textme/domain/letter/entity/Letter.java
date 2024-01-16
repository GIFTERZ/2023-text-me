package gifterz.textme.domain.letter.entity;

import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.entity.StatusType;
import gifterz.textme.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Letter extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;
    @Column(length = 50, nullable = false)
    private String senderName;
    @Column(length = 500, nullable = false)
    private String contents;
    @Column(length = 125)
    private String imageUrl;

    public static Letter of(User user, String senderName, String contents, String imageUrl) {
        return new Letter(user, senderName, contents, imageUrl);
    }

    private Letter(User user, String senderName, String contents, String imageUrl) {
        super(StatusType.ACTIVATE.getStatus());
        this.user = user;
        this.senderName = senderName;
        this.contents = contents;
        this.imageUrl = imageUrl;
    }
}
