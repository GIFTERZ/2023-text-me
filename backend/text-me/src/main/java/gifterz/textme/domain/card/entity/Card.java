package gifterz.textme.domain.card.entity;

import gifterz.textme.domain.entity.BaseEntity;
import gifterz.textme.domain.entity.StatusType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Card extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(length = 300)
    private String imageUrl;

    public static Card from(String imageUrl) {
        return new Card(imageUrl);
    }

    private Card(String imageUrl) {
        super(StatusType.ACTIVATE.getStatus());
        this.imageUrl = imageUrl;
    }
}
