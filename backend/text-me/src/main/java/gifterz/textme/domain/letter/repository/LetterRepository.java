package gifterz.textme.domain.letter.repository;

import gifterz.textme.domain.letter.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional(readOnly = true)
public interface LetterRepository extends JpaRepository<Letter, Long> {

    List<Letter> findAllByUserId(Long id);
}
