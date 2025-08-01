package com.pickeat.backend.wish.application.dto.request;

import jakarta.validation.constraints.NotBlank;

public record WishListRequest(
        @NotBlank(message = "위시리스트 이름은 공백을 허용하지 않습니다.")
        String name
) {
    
}
