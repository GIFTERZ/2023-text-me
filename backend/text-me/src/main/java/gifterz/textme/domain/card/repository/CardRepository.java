package gifterz.textme.domain.card.repository;

import gifterz.textme.domain.card.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)

public interface CardRepository extends JpaRepository<Card, Long> {
}
