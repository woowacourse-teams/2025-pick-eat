package com.pickeat.backend.global.config;

import com.pickeat.backend.global.auth.LoginUserIdArgumentResolver;
import com.pickeat.backend.global.auth.ParticipantIdArgumentResolver;
import com.pickeat.backend.global.auth.ProviderArgumentResolver;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final LoginUserIdArgumentResolver loginUserIdArgumentResolver;
    private final ParticipantIdArgumentResolver participantIdArgumentResolver;
    private final ProviderArgumentResolver providerArgumentResolver;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "https://pickeat.io.kr", "https://api.pickeat.io.kr",
                        "https://dev.pickeat.io.kr")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginUserIdArgumentResolver);
        resolvers.add(participantIdArgumentResolver);
        resolvers.add(providerArgumentResolver);
    }
}
