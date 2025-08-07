package com.pickeat.backend.global.config;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class DatabaseUrlLogger {

    private static final Logger log = LoggerFactory.getLogger(DatabaseUrlLogger.class);

    @Value("${spring.datasource.url}")
    private String mysqlUrl;

    @PostConstruct
    public void logDatabaseUrl() {
        log.info("### [CHECK] Database URL from environment: {}", mysqlUrl);
    }
}
