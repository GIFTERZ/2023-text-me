package gifterz.textme.common.firebase;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.HashMap;
import java.util.Map;

@Getter
@ConfigurationProperties(prefix = "cache.redis")
public class CacheProperties {

    private final Map<String, Long> ttl = new HashMap<>();
}
