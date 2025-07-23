package com.pickeat.backend;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@OpenAPIDefinition(
        servers = {
                @Server(url = "https://api.pickeat.io.kr", description = "픽잇 API 서버 도메인"),
                @Server(url = "http://localhost:8080", description = "로컬 개발 서버"),
        }
)
@ConfigurationPropertiesScan
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
