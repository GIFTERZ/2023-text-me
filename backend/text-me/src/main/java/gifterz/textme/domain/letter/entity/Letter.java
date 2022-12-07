package gifterz.textme.domain.letter.entity;

import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Letter extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user;
    @Column(nullable = false)
    private String senderName;
    @Lob
    @Column(nullable = false)
    private String contents;
    @Lob
    private String imageUrl;

    public static Letter of(User user, String senderName, String contents, String imageUrl) {
        return new Letter(user, senderName, contents, imageUrl);
    }

    public Letter(User user, String senderName, String contents, String imageUrl) {
        this.user = user;
        this.senderName = senderName;
        this.contents = contents;
        this.imageUrl = imageUrl;
    }
}
