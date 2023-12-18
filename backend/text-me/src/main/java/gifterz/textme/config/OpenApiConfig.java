package gifterz.textme.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "TextMe API 명세서",
                description = "API 명세서",
                version = "v1",
                contact = @Contact(name = "juy4556", email = "kws05050@naver.com"),
                license = @License(name = "Apache 2.0",
                        url = "http://www.apache.org/licenenses/LICENSE-2.0.html")
        )
)
@Configuration
public class OpenApiConfig {
    @Bean
    public GroupedOpenApi userApi() {
        String[] paths = {"/users/**"};
        return GroupedOpenApi.builder().group("사용자 관련 API").pathsToMatch(paths).build();
    }

    @Bean
    public GroupedOpenApi letterApi() {
        String[] paths = {"/letters/**"};
        return GroupedOpenApi.builder().group("편지 관련 API").pathsToMatch(paths).build();
    }

    @Bean
    public GroupedOpenApi s3Api() {
        String[] paths = {"/files/**"};
        return GroupedOpenApi.builder().group("업로드 관련 API").pathsToMatch(paths).build();
    }

    @Bean
    public GroupedOpenApi cardApi() {
        String[] paths = {"/cards/**"};
        return GroupedOpenApi.builder().group("카드 관련 API").pathsToMatch(paths).build();
    }
}
