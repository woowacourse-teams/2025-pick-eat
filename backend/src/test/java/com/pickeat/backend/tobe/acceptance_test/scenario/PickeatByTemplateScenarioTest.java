package com.pickeat.backend.tobe.acceptance_test.scenario;

import static com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest.참가자_생성;
import static com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest.참가자_선택_완료_표시;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.외부용_픽잇_생성;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_결과_생성;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_결과_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_비활성화;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_정보_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_활성화_상태_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇의_참가자_요약_정보_조회;
import static com.pickeat.backend.tobe.acceptance_test.piece.restaurant.RestaurantPieceTest.식당_제외;
import static com.pickeat.backend.tobe.acceptance_test.piece.restaurant.RestaurantPieceTest.식당_좋아요;
import static com.pickeat.backend.tobe.acceptance_test.piece.restaurant.RestaurantPieceTest.식당_좋아요_취소;
import static com.pickeat.backend.tobe.acceptance_test.piece.restaurant.RestaurantPieceTest.템플릿_기반_식당_목록_생성;
import static com.pickeat.backend.tobe.acceptance_test.piece.restaurant.RestaurantPieceTest.픽잇의_식당_조회;
import static com.pickeat.backend.tobe.acceptance_test.piece.template.TemplatePieceTest.템플릿_목록_조회;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResultResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.template.application.dto.response.TemplateResponse;
import com.pickeat.backend.tobe.restaurant.application.dto.request.TemplateRestaurantRequest;
import io.restassured.RestAssured;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;

@Sql("/init/template_data_v2.sql")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PickeatByTemplateScenarioTest {

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
    void 템플릿_기반_픽잇_플로우() {
        // 템플릿 조회
        List<TemplateResponse> templates = 템플릿_목록_조회();

        // 픽잇 생성
        PickeatResponse createdPickeat = 외부용_픽잇_생성(new PickeatRequest("우테코 점심 픽잇"));
        템플릿_기반_식당_목록_생성(createdPickeat.code(), new TemplateRestaurantRequest(templates.getFirst().id()));

        // 참여자 생성
        PickeatResponse pickeat = 픽잇_정보_조회(createdPickeat.code());
        TokenResponse participant1Token = 참가자_생성(new ParticipantRequest("참여자1", pickeat.id()));
        TokenResponse participant2Token = 참가자_생성(new ParticipantRequest("참여자2", pickeat.id()));
        TokenResponse participant3Token = 참가자_생성(new ParticipantRequest("참여자3", pickeat.id()));

        // 참여자들의 식당 소거
        List<RestaurantResponse> restaurants = 픽잇의_식당_조회(pickeat.code(), null, participant1Token.token());
        List<Long> restaurantIds = restaurants.stream().map(RestaurantResponse::id).toList();
        식당_제외(new RestaurantExcludeRequest(restaurantIds.subList(0, 1)), participant1Token.token());
        식당_제외(new RestaurantExcludeRequest(restaurantIds.subList(1, 2)), participant2Token.token());
        식당_제외(new RestaurantExcludeRequest(restaurantIds.subList(2, 3)), participant3Token.token());

        List<RestaurantResponse> restaurantAfterExcluded = 픽잇의_식당_조회(pickeat.code(), null, participant1Token.token());
        checkExcludedRestaurants(restaurantIds.subList(0, 3), restaurantAfterExcluded);

        참가자_선택_완료_표시(participant1Token.token());
        참가자_선택_완료_표시(participant2Token.token());
        참가자_선택_완료_표시(participant3Token.token());

        // 참여자들의 식당 좋아요
        ParticipantStateResponse participantStateSummary = 픽잇의_참가자_요약_정보_조회(pickeat.code());
        checkParticipantState(participantStateSummary, 3, 3);

        List<RestaurantResponse> noneExcludedRestaurant = 픽잇의_식당_조회(pickeat.code(), false, participant1Token.token());
        식당_좋아요(noneExcludedRestaurant.get(0).id(), participant1Token.token());
        식당_좋아요(noneExcludedRestaurant.get(1).id(), participant2Token.token());
        식당_좋아요(noneExcludedRestaurant.get(1).id(), participant3Token.token());
        식당_좋아요_취소(noneExcludedRestaurant.get(0).id(), participant1Token.token());

        // 픽잇 종료
        픽잇_비활성화(pickeat.code(), participant1Token.token());
        PickeatStateResponse pickeatState = 픽잇_활성화_상태_조회(pickeat.code());
        checkoutPickeatState(pickeatState, false);

        PickeatResultResponse pickeatResult = 픽잇_결과_생성(pickeat.code(), participant1Token.token());

        PickeatResultResponse pickeatResultFromParticipant1 = 픽잇_결과_조회(pickeat.code(), participant1Token.token());
        checkoutPickeatResult(pickeatResultFromParticipant1, pickeatResult);
        PickeatResultResponse pickeatResultFromParticipant2 = 픽잇_결과_조회(pickeat.code(), participant2Token.token());
        checkoutPickeatResult(pickeatResultFromParticipant2, pickeatResult);
        PickeatResultResponse pickeatResultFromParticipant3 = 픽잇_결과_조회(pickeat.code(), participant3Token.token());
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

    private void checkoutPickeatResult(PickeatResultResponse actual, PickeatResultResponse expected) {
        assertThat(actual).isEqualTo(expected);
    }

    private void checkParticipantState(
            ParticipantStateResponse participantState,
            int totalParticipantCount,
            int completedParticipantCount
    ) {
        assertAll(
                () -> assertThat(participantState.totalParticipants()).isEqualTo(totalParticipantCount),
                () -> assertThat(participantState.participants())
                        .filteredOn(ParticipantResponse::isCompleted)
                        .hasSize(completedParticipantCount)
        );
    }
}
