package com.pickeat.backend.wish.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.web.multipart.MultipartFile;

@Schema(description = "위시 생성 요청")
public record WishRequest(

        @Schema(description = "위시 이름", example = "맛있는 떡볶이")
        @NotBlank(message = "위시 이름은 공백을 허용하지 않습니다.")
        String name,
        @Schema(description = "카테고리", example = "한식")
        @NotBlank(message = "카테고리는 공백을 허용하지 않습니다.")
        String category,
        @Schema(description = "위시 이미지 파일 목록")
        List<MultipartFile> pictures,
        @Schema(description = "도로명 주소", example = "서울특별시 강남구 테헤란로 123")
        @NotBlank(message = "도로명주소는 공백을 허용하지 않습니다.")
        String roadAddressName,
        @Schema(description = "태그 목록", example = "[\"매운맛\", \"치즈추가\"]")
        List<String> tags
) {

}
