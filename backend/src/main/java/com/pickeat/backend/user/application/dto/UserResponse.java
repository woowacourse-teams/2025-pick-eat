package com.pickeat.backend.user.application.dto;

import com.pickeat.backend.user.domain.User;
import java.util.List;

public record UserResponse(long id, String nickname, Long providerId, String provider) {

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getNickname(),
                user.getProviderId(),
                user.getProvider()
        );
    }

    public static List<UserResponse> from(List<User> users) {
        return users.stream()
                .map(UserResponse::from)
                .toList();
    }
}
