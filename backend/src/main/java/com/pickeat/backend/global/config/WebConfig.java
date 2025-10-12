package com.pickeat.backend.global.config;

import com.pickeat.backend.global.auth.LoginUserIdArgumentResolver;
import com.pickeat.backend.global.auth.ParticipantIdArgumentResolver;
import com.pickeat.backend.global.auth.ProviderArgumentResolver;
import com.pickeat.backend.global.config.version.DeprecationInterceptor;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final LoginUserIdArgumentResolver loginUserIdArgumentResolver;
    private final ParticipantIdArgumentResolver participantIdArgumentResolver;
    private final ProviderArgumentResolver providerArgumentResolver;
    private final DeprecationInterceptor deprecationInterceptor;

    @Value("${cors.allowed-origins}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
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

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(deprecationInterceptor)
                .addPathPatterns("/api/v1/**");
    }
}
