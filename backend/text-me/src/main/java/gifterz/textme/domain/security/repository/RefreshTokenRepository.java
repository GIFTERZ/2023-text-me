package gifterz.textme.domain.security.repository;

import gifterz.textme.domain.security.entity.RefreshToken;
import gifterz.textme.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByRefreshToken(String token);

    Optional<RefreshToken> findByUser(User user);

}
