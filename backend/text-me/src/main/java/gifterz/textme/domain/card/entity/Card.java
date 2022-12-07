package gifterz.textme.domain.card.entity;

import gifterz.textme.domain.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Card extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Lob
    private String imageUrl;

    public static Card from(String imageUrl) {
        return new Card(imageUrl);
    }

    private Card(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}