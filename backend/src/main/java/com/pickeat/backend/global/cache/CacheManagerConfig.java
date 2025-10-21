package com.pickeat.backend.global.cache;

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
        manager.setCaches(Arrays.asList(
                buildCacheWithAccess(CacheType.RESTAURANT),
                buildCacheWithAccess(CacheType.RESTAURANT_LIKE_COUNT),
                buildCacheWithAccess(CacheType.PARTICIPANT_LIKES),
                buildCacheWithAccess(CacheType.PICKEAT),
                buildCacheWithAccess(CacheType.PARTICIPANT)
        ));
        return manager;
    }

    private CaffeineCache buildCacheWithAccess(CacheType cacheType) {
        Caffeine<Object, Object> builder = Caffeine.newBuilder()
                .expireAfterAccess(Duration.ofMinutes(cacheType.getTtlMinutes()))
                .maximumSize(cacheType.getMaxSize())
                .initialCapacity(cacheType.getInitialCapacity())
                .recordStats();

        return new CaffeineCache(cacheType.getName(), builder.build());
    }
}