package com.pickeat.backend.global.config;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DatabaseUrlChecker implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseUrlChecker.class);

    @Value("${spring.datasource.url}")
    private String databaseUrl;

    @Override
    public void run(String... args) throws Exception {
        log.info("### [DB_CHECK] JPA Connection will be attempted with URL: {}", databaseUrl);
    }
}
