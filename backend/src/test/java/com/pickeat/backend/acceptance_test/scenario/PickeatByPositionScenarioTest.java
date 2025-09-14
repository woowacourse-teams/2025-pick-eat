package com.pickeat.backend.acceptance_test.scenario;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest;
import com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest;
import com.pickeat.backend.acceptance_test.piece.restaurant.RestaurantPieceTest;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResultResponse;
import io.restassured.RestAssured;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PickeatByPositionScenarioTest {

    @LocalServerPort
    int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @AfterEach
    void clear() {
        RestAssured.reset();
    }

    @Test
    void 위치_기반_픽잇_플로우() {

        // 외부용 새 픽잇 생성
        // - 외부용 새 픽잇 생성 
        PickeatResponse createdPickeatResponse = PickeatPieceTest.createPickeatWithoutRoom(
                new PickeatRequest("우테코 점심 픽잇"));
        // - 위치 기반 식당 목록 생성
        RestaurantPieceTest.createRestaurantsByLocation(
                createdPickeatResponse.code(), new LocationRestaurantRequest(127.123, 37.123, 500));

        // 참여자 생성
        // - 픽잇 정보 조회
        PickeatResponse findedPickeatResponse = PickeatPieceTest.getPickeat(createdPickeatResponse.code());
        // - 새 참여자 생성
        TokenResponse participant1Token = ParticipantPieceTest.createParticipant(
                new ParticipantRequest("참여자1", findedPickeatResponse.id()));
        TokenResponse participant2Token = ParticipantPieceTest.createParticipant(
                new ParticipantRequest("참여자2", findedPickeatResponse.id()));
        TokenResponse participant3Token = ParticipantPieceTest.createParticipant(
                new ParticipantRequest("참여자3", findedPickeatResponse.id()));

        // 참여자들의 식당 소거
        // - 픽잇 식당 목록 조회
        List<RestaurantResponse> restaurants = RestaurantPieceTest.getPickeatRestaurants(
                findedPickeatResponse.code(), participant1Token.token(), null);
        // - 식당 소거
        List<Long> restaurantIds = restaurants.stream().map(RestaurantResponse::id).toList();
        RestaurantPieceTest.excludeRestaurants(
                new RestaurantExcludeRequest(restaurantIds.subList(0, 4)), participant1Token.token());
        RestaurantPieceTest.excludeRestaurants(
                new RestaurantExcludeRequest(restaurantIds.subList(3, 7)), participant2Token.token());
        RestaurantPieceTest.excludeRestaurants(
                new RestaurantExcludeRequest(restaurantIds.subList(6, 10)), participant3Token.token());
        // - 제거된 식당 확인
        List<Long> excludedRestaurantIds = restaurantIds.subList(0, 10);
        List<RestaurantResponse> restaurantAfterExcluded = RestaurantPieceTest.getPickeatRestaurants(
                findedPickeatResponse.code(), participant1Token.token(), null);
        checkExcludedRestaurants(excludedRestaurantIds, restaurantAfterExcluded);
        // -

        // 참여자들의 식당 좋아요
        // - 제거된 식당 목록 조회
        List<RestaurantResponse> noneExcludedRestaurant = RestaurantPieceTest.getPickeatRestaurants(
                findedPickeatResponse.code(), participant1Token.token(), null);
        // - 식당 좋아요
        RestaurantPieceTest.likeRestaurant(noneExcludedRestaurant.get(0).id(), participant1Token.token());
        RestaurantPieceTest.likeRestaurant(noneExcludedRestaurant.get(1).id(), participant2Token.token());
        RestaurantPieceTest.likeRestaurant(noneExcludedRestaurant.get(1).id(), participant3Token.token());
        // - 식당 좋아요 취소
        RestaurantPieceTest.cancelLikeRestaurant(noneExcludedRestaurant.get(0).id(), participant1Token.token());
        // -

        // 픽잇 종료
        // - 픽잇 비활성화
        PickeatPieceTest.deactivatePickeat(findedPickeatResponse.code(), participant1Token.token());
        // - 픽잇 활성화 상태 조회
        PickeatStateResponse pickeatState = PickeatPieceTest.getPickeatState(findedPickeatResponse.code());
        checkoutPickeatState(pickeatState, false);
        // - 픽잇 결과 생성
        RestaurantResultResponse pickeatResult = PickeatPieceTest.createPickeatResult(
                findedPickeatResponse.code(), participant1Token.token());
        // - 픽잇 결과 조회
        RestaurantResultResponse pickeatResultFromParticipant1 = PickeatPieceTest.getPickeatResult(
                findedPickeatResponse.code(), participant1Token.token());
        checkoutPickeatResult(pickeatResultFromParticipant1, pickeatResult);
        RestaurantResultResponse pickeatResultFromParticipant2 = PickeatPieceTest.getPickeatResult(
                findedPickeatResponse.code(), participant2Token.token());
        checkoutPickeatResult(pickeatResultFromParticipant2, pickeatResult);
        RestaurantResultResponse pickeatResultFromParticipant3 = PickeatPieceTest.getPickeatResult(
                findedPickeatResponse.code(), participant3Token.token());
        checkoutPickeatResult(pickeatResultFromParticipant3, pickeatResult);
    }

    private void checkExcludedRestaurants(List<Long> excludedRestaurantIds, List<RestaurantResponse> restaurants) {
        assertThat(restaurants)
                .filteredOn(RestaurantResponse::isExcluded)
                .extracting(RestaurantResponse::id)
                .containsAnyElementsOf(excludedRestaurantIds);
    }

    private void checkoutPickeatState(PickeatStateResponse pickeatState, boolean isActive) {
        assertThat(pickeatState.isActive()).isEqualTo(isActive);
    }

    private void checkoutPickeatResult(RestaurantResultResponse actual, RestaurantResultResponse expected) {
        assertThat(actual).isEqualTo(expected);
    }
}
