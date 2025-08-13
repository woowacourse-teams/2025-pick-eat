package com.pickeat.backend.pickeat.application.dto.response;

import com.pickeat.backend.restaurant.application.dto.response.RestaurantResultResponse;

public record PickeatResultCreationResponse(RestaurantResultResponse result, boolean isNewlyCreated) {

}
