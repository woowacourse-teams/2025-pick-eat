package com.pickeat.backend.restaurant.infrastructure;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pickeat.backend.global.exception.ExternalApiException;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class KakaoRestaurantSearchClientTest {

    private final RestClient.Builder testBuilder = RestClient.builder().baseUrl("https://dapi.kakao.com");
    private final MockRestServiceServer mockServer = MockRestServiceServer.bindTo(testBuilder).build();
    private final KakaoRestaurantSearchClient kakaoRestaurantSearchClient = new KakaoRestaurantSearchClient(
            testBuilder.build(), new ObjectMapper());

    @Nested
    class 카카오맵_식당_조회_API_호출_케이스 {

        @Test
        void 식당_조회_API_호출_파싱_성공() {
            // given
            String mockResponse = """
                    {
                        "documents": [
                            {
                                "address_name": "서울 송파구 신천동 7-28",
                                "category_group_code": "FD6",
                                "category_group_name": "음식점",
                                "category_name": "음식점 > 패스트푸드 > 샌드위치 > 써브웨이",
                                "distance": "45",
                                "id": "193686497",
                                "phone": "02-2202-1300",
                                "place_name": "써브웨이 잠실역점",
                                "place_url": "http://place.map.kakao.com/193686497",
                                "road_address_name": "서울 송파구 올림픽로 293-19",
                                "x": "127.10257039927868",
                                "y": "37.51516331584118"
                            },
                            {
                                "address_name": "서울 송파구 신천동 7-12",
                                "category_group_code": "FD6",
                                "category_group_name": "음식점",
                                "category_name": "음식점 > 한식",
                                "distance": "110",
                                "id": "1580595199",
                                "phone": "",
                                "place_name": "오호이 홈플러스 잠실점",
                                "place_url": "http://place.map.kakao.com/1580595199",
                                "road_address_name": "서울 송파구 올림픽로35가길 16",
                                "x": "127.103006246532",
                                "y": "37.5162513485861"
                            }
                        ],
                        "meta": {
                            "is_end": false,
                            "pageable_count": 11,
                            "same_name": {
                                "keyword": "패스트푸드",
                                "region": [],
                                "selected_region": ""
                            },
                            "total_count": 11
                        }
                    }
                    """;

            mockServer.expect(requestTo(startsWith("https://dapi.kakao.com/v2/local/search/keyword.json")))
                    .andExpect(method(HttpMethod.GET))
                    .andRespond(withSuccess(mockResponse, MediaType.APPLICATION_JSON));

            // when
            List<RestaurantRequest> response = kakaoRestaurantSearchClient.getRestaurants(
                    new RestaurantSearchRequest("패스트푸드", 127.1234874512, 26.1395871235, 200, 2));

            // then
            assertThat(response).hasSize(2);

            RestaurantRequest first = response.get(0);
            assertThat(first.name()).isEqualTo("써브웨이 잠실역점");
            assertThat(first.distance()).isEqualTo(45);
            assertThat(first.roadAddressName()).isEqualTo("서울 송파구 올림픽로 293-19");
            assertThat(first.x()).isEqualTo(127.10257039927868);
            assertThat(first.y()).isEqualTo(37.51516331584118);
            assertThat(first.placeUrl()).isEqualTo("http://place.map.kakao.com/193686497");
            assertThat(first.category().getName()).isEqualTo("기타");

            RestaurantRequest second = response.get(1);
            assertThat(second.name()).isEqualTo("오호이 홈플러스 잠실점");
            assertThat(second.distance()).isEqualTo(110);
            assertThat(second.roadAddressName()).isEqualTo("서울 송파구 올림픽로35가길 16");
            assertThat(second.x()).isEqualTo(127.103006246532);
            assertThat(second.y()).isEqualTo(37.5162513485861);
            assertThat(second.placeUrl()).isEqualTo("http://place.map.kakao.com/1580595199");
            assertThat(second.category().getName()).isEqualTo("한식");
        }

        @Test
        void 식당_조회_API_호출_예외_발생() {
            // given
            String mockResponse = """
                    {
                        "errorType": "ValidationError",
                        "message": "Request validation is failed",
                        "details": [
                            {
                                "field": "query.category_group_code",
                                "error": "should be one of MT1, CS2, PS3, SC4, AC5, PK6, OL7, SW8, BK9, CT1, AG2, PO3, AT4, AD5, FD6, CE7, HP8, PM9"
                            }
                        ]
                    }
                    """;

            mockServer.expect(requestTo(startsWith("https://dapi.kakao.com/v2/local/search/keyword.json")))
                    .andExpect(method(HttpMethod.GET))
                    .andRespond(
                            withStatus(HttpStatus.BAD_REQUEST)
                                    .contentType(MediaType.APPLICATION_JSON)
                                    .body(mockResponse)
                    );

            // when & then
            assertThatThrownBy(() -> kakaoRestaurantSearchClient.getRestaurants(
                    new RestaurantSearchRequest("패스트푸드", 127.1234874512, 26.1395871235, 200, 2))
            )
                    .isInstanceOf(ExternalApiException.class);
        }
    }
}
