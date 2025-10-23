package com.pickeat.backend.tobe.user.application.dto;

import com.pickeat.backend.user.domain.User;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema(description = "유저 응답", name = "UserResponseV2")
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
