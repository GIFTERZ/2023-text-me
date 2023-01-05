package gifterz.textme;

import gifterz.textme.common.firebase.CacheProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties(value = {CacheProperties.class})
public class TextMeApplication {

    public static void main(String[] args) {
        SpringApplication.run(TextMeApplication.class, args);
    }

}
