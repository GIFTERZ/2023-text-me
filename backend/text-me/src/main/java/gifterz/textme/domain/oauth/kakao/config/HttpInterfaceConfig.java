package gifterz.textme.domain.oauth.kakao.config;

import gifterz.textme.domain.oauth.kakao.controller.KakaoApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class HttpInterfaceConfig {

    @Bean
    KakaoApi kakaoApi() {
        WebClient client = WebClient.create();
        HttpServiceProxyFactory httpServiceProxyFactory = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(client))
                .build();

        return httpServiceProxyFactory.createClient(KakaoApi.class);
    }
}
