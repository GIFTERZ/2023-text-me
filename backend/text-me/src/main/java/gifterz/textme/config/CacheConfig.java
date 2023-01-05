package gifterz.textme.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.databind.jsontype.PolymorphicTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import gifterz.textme.common.firebase.CacheProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

@Configuration
@EnableCaching
@RequiredArgsConstructor
public class CacheConfig {

    private final CacheProperties cacheProperties;

    @Value("${spring.redis.cache.host}")
    private String redisHost;

    @Value("${spring.redis.cache.port}")
    private int redisPort;

    @Bean(name = "redisCacheConnectionFactory")
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(redisHost, redisPort);
    }

    private ObjectMapper objectMapper() {

        PolymorphicTypeValidator ptv = BasicPolymorphicTypeValidator
                .builder()
                .allowIfSubType(Object.class)
                .build();
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS);
        mapper.registerModule(new JavaTimeModule());
        mapper.activateDefaultTyping(ptv, ObjectMapper.DefaultTyping.NON_FINAL);
        return mapper;
    }

    private RedisCacheConfiguration redisCacheDefaultConfiguration() {
        return RedisCacheConfiguration
                .defaultCacheConfig()
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(new GenericJackson2JsonRedisSerializer(objectMapper())));
    }

    private Map<String, RedisCacheConfiguration> redisCacheConfigurationMap() {
        Map<String, RedisCacheConfiguration> cacheConfigurationMap = new HashMap<>();
        for (Entry<String, Long> cacheNameAndTimeout : cacheProperties.getTtl().entrySet()) {
            cacheConfigurationMap
                    .put(cacheNameAndTimeout.getKey(), redisCacheDefaultConfiguration().entryTtl(
                            Duration.ofSeconds(cacheNameAndTimeout.getValue())));
        }
        return cacheConfigurationMap;
    }

    @Bean
    public CacheManager redisCacheManager(
            @Qualifier("redisCacheConnectionFactory") RedisConnectionFactory redisConnectionFactory) {
        return RedisCacheManager.RedisCacheManagerBuilder
                .fromConnectionFactory(redisConnectionFactory)
                .cacheDefaults(redisCacheDefaultConfiguration())
                .withInitialCacheConfigurations(redisCacheConfigurationMap())
                .build();
    }
}
