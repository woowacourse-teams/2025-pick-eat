package com.pickeat.backend.wish.application.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public record WishRequest(

        @NotBlank(message = "위시 이름은 공백을 허용하지 않습니다.")
        String name,
        @NotBlank(message = "위시 이름은 공백을 허용하지 않습니다.")
        String category,
        List<MultipartFile> pictures,
        @NotBlank(message = "도로명주소는 공백을 허용하지 않습니다.")
        String roadAddressName,
        List<String> tags
) {

}
