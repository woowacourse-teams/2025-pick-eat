package com.pickeat.backend.wish.application.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record WishUpdateRequest(

        @Schema(description = "위시 이름", example = "맛있는 초밥")
        @NotBlank(message = "비어있는 위시 이름은 허용하지 않습니다.")
        String name,
        @Schema(description = "카테고리", example = "일식")
        @NotBlank(message = "비어있는 카테고리는 허용하지 않습니다.")
        String category,
        @Schema(description = "도로명 주소", example = "서울특별시 강동구 화합로 325")
        @NotBlank(message = "비어있는 도로명주소는 허용하지 않습니다.")
        String roadAddressName,
        @Schema(description = "태그 목록", example = "[\"초밥\", \"튀김\"]")
        List<String> tags
) {

}
