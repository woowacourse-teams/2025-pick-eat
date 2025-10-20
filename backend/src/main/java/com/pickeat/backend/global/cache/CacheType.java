package com.pickeat.backend.global.cache;

import lombok.Getter;

@Getter
public enum CacheType {
    //TODO: size, ttl 점검  (2025-10-21, 화, 2:51)
    RESTAURANT("restaurant", 3L, 4500L, 500),
    RESTAURANT_LIKE_COUNT("restaurant:like-count", 3L, 4500L, 500),
    PARTICIPANT_LIKES("participant:likes", 3L, 4500L, 500),
    PICKEAT("pickeat", 3L, 4500L, 500),
    PARTICIPANT("participant", 3L, 4500L, 500),
    ;

    private final String name;
    private final Long ttlMinutes;
    private final Long maxSize;
    private final Integer initialCapacity;

    CacheType(String name, Long ttlMinutes, Long maxSize, Integer initialCapacity) {
        this.name = name;
        this.ttlMinutes = ttlMinutes;
        this.maxSize = maxSize;
        this.initialCapacity = initialCapacity;
    }
}
