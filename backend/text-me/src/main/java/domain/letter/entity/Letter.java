package domain.letter.entity;

import domain.entity.BaseEntity;
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
    @Column(nullable = false)
    private String senderName;
    @Lob
    @Column(nullable = false)
    private String contents;
    @Lob
    private String imageUrl;

    public Letter from (String senderName, String contents, String imageUrl) {
        return new Letter(senderName,contents, imageUrl);
    }

    private Letter (String senderName, String contents, String imageUrl) {
        this.senderName = senderName;
        this.contents = contents;
        this.imageUrl = imageUrl;
    }
}
