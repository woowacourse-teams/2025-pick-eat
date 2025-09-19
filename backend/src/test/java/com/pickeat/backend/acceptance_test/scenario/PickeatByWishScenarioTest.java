package com.pickeat.backend.acceptance_test.scenario;

import static com.pickeat.backend.acceptance_test.piece.login.LoginPieceTest.회원가입;
import static com.pickeat.backend.acceptance_test.piece.login.LoginPieceTest.회원가입을_위한_코드_처리;
import static com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest.참가자_생성;
import static com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest.참가자_선택_완료_표시;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.방에서_픽잇_생성;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_결과_생성;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_결과_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_비활성화;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_정보_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_활성화_상태_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇의_참가자_요약_정보_조회;
import static com.pickeat.backend.acceptance_test.piece.restaurant.RestaurantPieceTest.식당_소거;
import static com.pickeat.backend.acceptance_test.piece.restaurant.RestaurantPieceTest.식당_좋아요;
import static com.pickeat.backend.acceptance_test.piece.restaurant.RestaurantPieceTest.식당_좋아요_취소;
import static com.pickeat.backend.acceptance_test.piece.restaurant.RestaurantPieceTest.위시리스트_기반으로_식당_생성;
import static com.pickeat.backend.acceptance_test.piece.restaurant.RestaurantPieceTest.픽잇의_식당_조회;
import static com.pickeat.backend.acceptance_test.piece.room.RoomPieceTest.방_생성;
import static com.pickeat.backend.acceptance_test.piece.room.RoomPieceTest.방_정보_조회;
import static com.pickeat.backend.acceptance_test.piece.room.RoomPieceTest.방_초대;
import static com.pickeat.backend.acceptance_test.piece.user.UserPieceTest.유저_검색;
import static com.pickeat.backend.acceptance_test.piece.wish.WishListPieceTest.방의_위시리스트_조회;
import static com.pickeat.backend.acceptance_test.piece.wish.WishPieceTest.위시_생성;
import static com.pickeat.backend.acceptance_test.piece.wish.WishPieceTest.위시리스트에_담긴_위시_조회;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import com.pickeat.backend.login.application.dto.request.AuthCodeRequest;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantStateResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatStateResponse;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResponse;
import com.pickeat.backend.restaurant.application.dto.response.RestaurantResultResponse;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.user.application.dto.UserResponse;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.response.WishListResponse;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import io.restassured.RestAssured;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PickeatByWishScenarioTest {

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
    void 위시_기반_픽잇_플로우() {
        // 회원 가입
        TokenResponse readerProviderToken = 회원가입을_위한_코드_처리(new AuthCodeRequest("test_code1", "kakao", "url"));
        TokenResponse readerAuthToken = 회원가입(new SignupRequest("reader"), readerProviderToken.token());
        TokenResponse follower1ProviderToken = 회원가입을_위한_코드_처리(new AuthCodeRequest("test_code2", "kakao", "url"));
        TokenResponse follower1AuthToken = 회원가입(new SignupRequest("follwer1"), follower1ProviderToken.token());
        TokenResponse follower2ProviderToken = 회원가입을_위한_코드_처리(new AuthCodeRequest("test_code3", "kakao", "url"));
        TokenResponse follower2AuthToken = 회원가입(new SignupRequest("follwer2"), follower2ProviderToken.token());

        // 방 구성
        RoomResponse room = 방_생성(new RoomRequest("점심크루 모임"), readerAuthToken.token());

        List<UserResponse> searchedUsers = 유저_검색("follwer");
        List<Long> invitedUserIds = searchedUsers.stream().map(UserResponse::id).toList();
        방_초대(room.id(), new RoomInvitationRequest(invitedUserIds), readerAuthToken.token());

        RoomResponse roomInformation = 방_정보_조회(room.id(), readerAuthToken.token());
        checkUserCountInRoom(roomInformation, 3);

        // 위시리스트 생성
        long wishlistId = room.wishlistId();
        위시_생성(wishlistId,
                new WishRequest("식당1", FoodCategory.KOREAN.getName(), "도로명", List.of("태그1"), "url1"),
                readerAuthToken.token());
        위시_생성(wishlistId,
                new WishRequest("식당2", FoodCategory.KOREAN.getName(), "도로명", List.of("태그1"), "url1"),
                readerAuthToken.token());
        위시_생성(wishlistId,
                new WishRequest("식당3", FoodCategory.KOREAN.getName(), "도로명", List.of("태그1"), "url1"),
                readerAuthToken.token());
        위시_생성(wishlistId,
                new WishRequest("식당4", FoodCategory.KOREAN.getName(), "도로명", List.of("태그1"), "url1"),
                readerAuthToken.token());
        위시_생성(wishlistId,
                new WishRequest("식당5", FoodCategory.KOREAN.getName(), "도로명", List.of("태그1"), "url1"),
                readerAuthToken.token());

        // 위시리스트 조회
        WishListResponse createdWishList = 방의_위시리스트_조회(room.id(), readerAuthToken.token());
        List<WishResponse> createdWish = 위시리스트에_담긴_위시_조회(createdWishList.id(), readerAuthToken.token());
        checkWishSizeInWishList(createdWish, 5);

        // 픽잇 생성
        PickeatResponse createdPickeat = 방에서_픽잇_생성(room.id(), new PickeatRequest("우테코 점심 픽잇"), readerAuthToken.token());
        위시리스트_기반으로_식당_생성(createdPickeat.code(), new WishRestaurantRequest(wishlistId));

        // 참여자 생성
        PickeatResponse pickeat = 픽잇_정보_조회(createdPickeat.code());
        TokenResponse participant1Token = 참가자_생성(new ParticipantRequest("참여자1", pickeat.id()));
        TokenResponse participant2Token = 참가자_생성(new ParticipantRequest("참여자2", pickeat.id()));
        TokenResponse participant3Token = 참가자_생성(new ParticipantRequest("참여자3", pickeat.id()));

        // 참여자들의 식당 소거
        List<RestaurantResponse> restaurants = 픽잇의_식당_조회(pickeat.code(), participant1Token.token(), null);
        List<Long> restaurantIds = restaurants.stream().map(RestaurantResponse::id).toList();
        식당_소거(new RestaurantExcludeRequest(restaurantIds.subList(0, 1)), participant1Token.token());
        식당_소거(new RestaurantExcludeRequest(restaurantIds.subList(1, 2)), participant2Token.token());
        식당_소거(new RestaurantExcludeRequest(restaurantIds.subList(2, 3)), participant3Token.token());

        List<RestaurantResponse> restaurantAfterExcluded = 픽잇의_식당_조회(pickeat.code(), participant1Token.token(), null);
        checkExcludedRestaurants(restaurantIds.subList(0, 3), restaurantAfterExcluded);

        참가자_선택_완료_표시(participant1Token.token());
        참가자_선택_완료_표시(participant2Token.token());
        참가자_선택_완료_표시(participant3Token.token());

        // 참여자들의 식당 좋아요
        ParticipantStateResponse participantStateSummary = 픽잇의_참가자_요약_정보_조회(pickeat.code());
        checkParticipantState(participantStateSummary, 3, 3);

        List<RestaurantResponse> noneExcludedRestaurant = 픽잇의_식당_조회(pickeat.code(), participant1Token.token(), false);
        식당_좋아요(noneExcludedRestaurant.get(0).id(), participant1Token.token());
        식당_좋아요(noneExcludedRestaurant.get(1).id(), participant2Token.token());
        식당_좋아요(noneExcludedRestaurant.get(1).id(), participant3Token.token());
        식당_좋아요_취소(noneExcludedRestaurant.get(0).id(), participant1Token.token());

        // 픽잇 종료
        픽잇_비활성화(pickeat.code(), participant1Token.token());
        PickeatStateResponse pickeatState = 픽잇_활성화_상태_조회(pickeat.code());
        checkoutPickeatState(pickeatState, false);

        RestaurantResultResponse pickeatResult = 픽잇_결과_생성(pickeat.code(), participant1Token.token());

        RestaurantResultResponse pickeatResultFromParticipant1 = 픽잇_결과_조회(pickeat.code(), participant1Token.token());
        checkoutPickeatResult(pickeatResultFromParticipant1, pickeatResult);
        RestaurantResultResponse pickeatResultFromParticipant2 = 픽잇_결과_조회(pickeat.code(), participant2Token.token());
        checkoutPickeatResult(pickeatResultFromParticipant2, pickeatResult);
        RestaurantResultResponse pickeatResultFromParticipant3 = 픽잇_결과_조회(pickeat.code(), participant3Token.token());
        checkoutPickeatResult(pickeatResultFromParticipant3, pickeatResult);
    }

    private void checkUserCountInRoom(RoomResponse room, int expectedCount) {
        assertThat(room.userCount()).isEqualTo(expectedCount);
    }

    private void checkWishSizeInWishList(List<WishResponse> wishes, int size) {
        assertThat(wishes).hasSize(size);
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
