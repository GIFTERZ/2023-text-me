package gifterz.textme.domain.security.jwt;

import gifterz.textme.domain.user.entity.User;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${security.jwt.token.secretKey}")
    private String jwtSecret;

    @Value("${security.jwt.token.expirationMs}")
    private Long jwtExpirationMs;


    public String generateAccessToken(String email) {
        return generateTokenFromSubject("ATK", email, jwtExpirationMs);
    }

    private String generateTokenFromSubject(String subject, String payload, Long expirationMs) {
        return Jwts.builder().setSubject(subject).setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + expirationMs))
                .setPayload(payload)
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }


    public String getUserEmailFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    public String extractEmail(String token) {
        return Jwts.parser().setSigningKey(jwtSecret)
                .parseClaimsJws(token).getBody().getSubject();
    }
}
