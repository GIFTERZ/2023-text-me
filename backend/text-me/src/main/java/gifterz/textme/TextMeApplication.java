package gifterz.textme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TextMeApplication {

    public static void main(String[] args) {
        SpringApplication.run(TextMeApplication.class, args);
    }

}
