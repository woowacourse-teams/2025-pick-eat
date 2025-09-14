package com.pickeat.backend.acceptance_test.scenario;

import com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest;
import com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest;
import com.pickeat.backend.acceptance_test.piece.restaurant.RestaurantPieceTest;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import io.restassured.RestAssured;
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
        // - 외부용 새 픽잇 생성 API
        PickeatResponse createdPickeatResponse = PickeatPieceTest.createPickeatWithoutRoom(
                new PickeatRequest("우테코 점심 픽잇"));
        // - 위치 기반 식당 목록 생성 API
        RestaurantPieceTest.createRestaurantsByLocation(
                createdPickeatResponse.code(), new LocationRestaurantRequest(127.123, 37.123, 500));

        // 참여자 생성
        // - 픽잇 정보 조회 API
        PickeatResponse findedPickeatResponse = PickeatPieceTest.getPickeat(createdPickeatResponse.code());
        // - 새 참여자 생성 API
        TokenResponse participant1Token = ParticipantPieceTest.createParticipant(
                new ParticipantRequest("참여자1", findedPickeatResponse.id()));
        TokenResponse participant2Token = ParticipantPieceTest.createParticipant(
                new ParticipantRequest("참여자2", findedPickeatResponse.id()));
        TokenResponse participant3Token = ParticipantPieceTest.createParticipant(
                new ParticipantRequest("참여자3", findedPickeatResponse.id()));

        // 참여자들의 식당 소거
        // - 픽잇 식당 목록 조회
        // - 식당 소거

        // 참여자들의 식당 좋아요
        // - 식당 좋아요
        // - 식당 좋아요 취소

        // 픽잇 종료
        // - 픽잇 비활성화
        // - 픽잇 결과 생성
        // - 픽잇 결과 조회
    }
}
