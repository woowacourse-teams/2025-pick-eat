package com.pickeat.backend.wish.application.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record WishRequests(
        @NotNull
        @NotEmpty
        List<WishRequest> request
) {

}
