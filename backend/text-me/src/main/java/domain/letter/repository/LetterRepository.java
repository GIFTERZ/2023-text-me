package domain.letter.repository;

import domain.letter.entity.Letter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public interface LetterRepository extends JpaRepository<Letter, Long> {

    Slice<Letter> findAllByUserId(Long id, Pageable pageable);
}
