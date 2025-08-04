package com.pickeat.backend.wish.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Schema(description = "위시 생성 요청 목록")
public record WishRequests(
        @Schema(description = "위시 생성 요청 목록")
        @NotNull
        @NotEmpty(message = "생성할 위시들은 비어있는 것을 허용하지 않습니다.")
        List<@Valid WishRequest> requests
) {

}
