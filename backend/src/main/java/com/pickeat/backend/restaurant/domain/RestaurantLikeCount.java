package com.pickeat.backend.restaurant.domain;

import java.util.concurrent.atomic.AtomicLong;

public class RestaurantLikeCount {
    private final AtomicLong count;

    public RestaurantLikeCount(AtomicLong count) {
        this.count = count;
    }

    public void increaseCount() {
        count.incrementAndGet();
    }

    public void decreaseCount() {
        count.decrementAndGet();
    }

    public int getCount() {
        return count.intValue();
    }
}
