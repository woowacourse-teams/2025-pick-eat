package com.pickeat.backend.user.application.dto;

import com.pickeat.backend.user.domain.User;

public record UserResponse(Long id, String nickname, Long providerId, String provider) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(),
                user.getNickname(),
                user.getProviderId(),
                user.getProvider());
    }
}
