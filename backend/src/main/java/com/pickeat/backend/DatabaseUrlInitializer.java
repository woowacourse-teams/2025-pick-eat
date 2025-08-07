package com.pickeat.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;


public class DatabaseUrlInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    private static final Logger log = LoggerFactory.getLogger(DatabaseUrlInitializer.class);

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        Environment environment = applicationContext.getEnvironment();
        String databaseUrl = environment.getProperty("spring.datasource.url");
        log.info("### [DB_CHECK] ApplicationContextInitializer - Database URL: {}", databaseUrl);
    }
}
