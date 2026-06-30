package com.pickeat.backend.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.domain.RestaurantCategory;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class GoogleRestaurantSearchClientTest {

    private final RestClient.Builder testBuilder = RestClient.builder().baseUrl("https://places.googleapis.com");
    private final MockRestServiceServer mockServer = MockRestServiceServer.bindTo(testBuilder).build();
    private final GoogleRestaurantSearchClient googleRestaurantSearchClient = new GoogleRestaurantSearchClient(
            testBuilder.build(), new ObjectMapper());

    @Nested
    class 구글_플레이스_식당_조회_API_호출_케이스 {

        @Test
        void 식당_조회_API_호출_파싱_성공() {
            // given
            String mockResponse = """
                    {
                        "places": [
                            {
                                "displayName": { "text": "맛있는 식당" },
                                "googleMapsUri": "https://maps.google.com/?cid=1"
                            },
                            {
                                "displayName": { "text": "또다른 식당" },
                                "googleMapsUri": "https://maps.google.com/?cid=2"
                            }
                        ]
                    }
                    """;

            mockServer.expect(requestTo("https://places.googleapis.com/v1/places:searchNearby"))
                    .andExpect(method(HttpMethod.POST))
                    .andRespond(withSuccess(mockResponse, MediaType.APPLICATION_JSON));

            // when
            List<RestaurantRequest> response = googleRestaurantSearchClient.getRestaurants(
                    new RestaurantSearchRequest(RestaurantCategory.FASTFOOD, 127.1234874512, 26.1395871235, 200, 2));

            // then
            assertThat(response).hasSize(2);
            assertThat(response.get(0).name()).isEqualTo("맛있는 식당");
            assertThat(response.get(0).placeUrl()).isEqualTo("https://maps.google.com/?cid=1");
        }

        @Test
        void 이름이나_지도URI가_없는_장소는_결과에서_제외한다() {
            // given
            String mockResponse = """
                    {
                        "places": [
                            {
                                "displayName": { "text": "" },
                                "googleMapsUri": "https://maps.google.com/?cid=1"
                            },
                            {
                                "displayName": { "text": "정상 식당" },
                                "googleMapsUri": "https://maps.google.com/?cid=2"
                            }
                        ]
                    }
                    """;

            mockServer.expect(requestTo("https://places.googleapis.com/v1/places:searchNearby"))
                    .andExpect(method(HttpMethod.POST))
                    .andRespond(withSuccess(mockResponse, MediaType.APPLICATION_JSON));

            // when
            List<RestaurantRequest> response = googleRestaurantSearchClient.getRestaurants(
                    new RestaurantSearchRequest(RestaurantCategory.FASTFOOD, 127.1234874512, 26.1395871235, 200, 2));

            // then
            assertThat(response).hasSize(1);
            assertThat(response.get(0).name()).isEqualTo("정상 식당");
        }

        @Test
        void places_필드가_없으면_빈_리스트를_반환한다() {
            // given
            mockServer.expect(requestTo("https://places.googleapis.com/v1/places:searchNearby"))
                    .andExpect(method(HttpMethod.POST))
                    .andRespond(withSuccess("{}", MediaType.APPLICATION_JSON));

            // when
            List<RestaurantRequest> response = googleRestaurantSearchClient.getRestaurants(
                    new RestaurantSearchRequest(RestaurantCategory.FASTFOOD, 127.1234874512, 26.1395871235, 200, 2));

            // then
            assertThat(response).isEmpty();
        }

        @Test
        void 구글_서버가_에러_응답을_반환하면_ExternalApiException을_던진다() {
            // given
            String errorResponse = """
                    {
                        "error": {
                            "code": 400,
                            "message": "Invalid request"
                        }
                    }
                    """;

            mockServer.expect(requestTo("https://places.googleapis.com/v1/places:searchNearby"))
                    .andExpect(method(HttpMethod.POST))
                    .andRespond(
                            withStatus(HttpStatus.BAD_REQUEST)
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .body(errorResponse)
                    );

            // when & then
            assertThatThrownBy(() -> googleRestaurantSearchClient.getRestaurants(
                    new RestaurantSearchRequest(RestaurantCategory.FASTFOOD, 127.1234874512, 26.1395871235, 200, 2))
            )
                    .isInstanceOf(ExternalApiException.class);
        }
    }
}
