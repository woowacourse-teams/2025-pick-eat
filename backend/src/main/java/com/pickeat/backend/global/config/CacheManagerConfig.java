package com.pickeat.backend.global.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import java.time.Duration;
import java.util.Arrays;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheManagerConfig {

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager manager = new SimpleCacheManager();
        //Todo: enum으로 변경 [2025-10-16 16:23:59]
        manager.setCaches(Arrays.asList(
                buildCacheWithWrite("pickeat", 5, 100, 50),
                buildCacheWithAccess("restaurant", 3, 4500, 500),
                buildCacheWithAccess("participant", 3, 1000, 100),
                buildCacheWithAccess("restaurant:like", 3, 4500, 500)
        ));
        return manager;
    }

    private CaffeineCache buildCacheWithWrite(String name, long ttlMinutes, long maxSize,
                                              int initialCapacity) {
        Caffeine<Object, Object> builder = Caffeine.newBuilder()
                .expireAfterWrite(Duration.ofMinutes(ttlMinutes))
                .maximumSize(maxSize)
                .initialCapacity(initialCapacity)
                .recordStats();

        return new CaffeineCache(name, builder.build());
    }


    private CaffeineCache buildCacheWithAccess(String name, long ttlMinutes, long maxSize,
                                               int initialCapacity) {
        Caffeine<Object, Object> builder = Caffeine.newBuilder()
                .expireAfterAccess(Duration.ofMinutes(ttlMinutes))
                .maximumSize(maxSize)
                .initialCapacity(initialCapacity)
                .recordStats();

        return new CaffeineCache(name, builder.build());
    }
}
