package com.pickeat.backend.acceptance_test.scenario;

import static com.pickeat.backend.acceptance_test.piece.login.LoginPieceTest.회원가입;
import static com.pickeat.backend.acceptance_test.piece.login.LoginPieceTest.회원가입을_위한_코드_처리;
import static com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest.참가자_생성;
import static com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest.참가자_선택_완료_표시;
import static com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest.참가자_선택_완료_표시_취소;
import static com.pickeat.backend.acceptance_test.piece.participant.ParticipantPieceTest.참가자_정보_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.방에서_픽잇_생성;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.방의_픽잇_목록_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.방의_활성_픽잇_목록_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.유저가_속한_픽잇_목록_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.참가중인_픽잇_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_정보_조회;
import static com.pickeat.backend.acceptance_test.piece.pickeat.PickeatPieceTest.픽잇_재참여_가능_여부_조회;
import static com.pickeat.backend.acceptance_test.piece.room.RoomPieceTest.방_나가기;
import static com.pickeat.backend.acceptance_test.piece.room.RoomPieceTest.방_생성;
import static com.pickeat.backend.acceptance_test.piece.room.RoomPieceTest.방_전체_조회;
import static com.pickeat.backend.acceptance_test.piece.room.RoomPieceTest.방_초대;
import static com.pickeat.backend.acceptance_test.piece.template.TemplatePieceTest.템플릿_목록_조회;
import static com.pickeat.backend.acceptance_test.piece.template.TemplateWishPieceTest.템플릿_소원_목록_조회;
import static com.pickeat.backend.acceptance_test.piece.user.UserPieceTest.내_정보_조회;
import static com.pickeat.backend.acceptance_test.piece.user.UserPieceTest.방_유저_목록_조회;
import static com.pickeat.backend.acceptance_test.piece.user.UserPieceTest.유저_검색;
import static com.pickeat.backend.acceptance_test.piece.wish.WishPicturePieceTest.위시_사진_삭제;
import static com.pickeat.backend.acceptance_test.piece.wish.WishPicturePieceTest.위시_사진_생성;
import static com.pickeat.backend.acceptance_test.piece.wish.WishPieceTest.위시_삭제;
import static com.pickeat.backend.acceptance_test.piece.wish.WishPieceTest.위시_생성;
import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.login.application.dto.request.AuthCodeRequest;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.pickeat.application.dto.response.ParticipantResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatRejoinAvailableResponse;
import com.pickeat.backend.pickeat.application.dto.response.PickeatResponse;
import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.room.application.dto.response.RoomResponse;
import com.pickeat.backend.template.application.dto.response.TemplateResponse;
import com.pickeat.backend.template.application.dto.response.TemplateWishResponse;
import com.pickeat.backend.user.application.dto.UserResponse;
import com.pickeat.backend.wish.application.dto.response.WishPictureResponse;
import com.pickeat.backend.wish.application.dto.response.WishResponse;
import com.pickeat.backend.restaurant.domain.FoodCategory;
import io.restassured.RestAssured;
import java.io.File;
import java.net.URL;
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
public class PickeatEndpointCoverageScenarioTest {

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
    void 방_유저_위시_픽잇_참가자_조회_플로우() {
        // 회원 가입
        TokenResponse ownerProviderToken = 회원가입을_위한_코드_처리(new AuthCodeRequest("coverage_code1", "kakao", "url"));
        TokenResponse ownerAuthToken = 회원가입(new SignupRequest("owner"), ownerProviderToken.token());
        TokenResponse memberProviderToken = 회원가입을_위한_코드_처리(new AuthCodeRequest("coverage_code2", "kakao", "url"));
        TokenResponse memberAuthToken = 회원가입(new SignupRequest("coveragemember"), memberProviderToken.token());

        // 방 구성
        RoomResponse room = 방_생성(new RoomRequest("커버리지 점검방"), ownerAuthToken.token());
        List<UserResponse> searchedUsers = 유저_검색("coveragemember");
        List<Long> invitedUserIds = searchedUsers.stream().map(UserResponse::id).toList();
        방_초대(room.id(), new RoomInvitationRequest(invitedUserIds), ownerAuthToken.token());

        // 방 전체 조회
        List<RoomResponse> rooms = 방_전체_조회(ownerAuthToken.token());
        assertThat(rooms).extracting(RoomResponse::id).contains(room.id());

        // 유저 조회
        UserResponse myInfo = 내_정보_조회(ownerAuthToken.token());
        assertThat(myInfo.nickname()).isEqualTo("owner");
        List<UserResponse> roomUsers = 방_유저_목록_조회(room.id());
        assertThat(roomUsers).hasSize(2);

        // 위시 생성, 사진 업로드/삭제, 위시 삭제
        WishResponse wish = 위시_생성(room.id(),
                new com.pickeat.backend.wish.application.dto.request.WishRequest(
                        "식당1", FoodCategory.KOREAN.getName(), "도로명", List.of("태그1"), "url1"),
                ownerAuthToken.token());

        URL imageUrl = getClass().getClassLoader().getResource("test-images/sample.jpg");
        File wishPicture = new File(imageUrl.getFile());
        WishPictureResponse wishPictureResponse = 위시_사진_생성(wish.id(), wishPicture, ownerAuthToken.token());
        assertThat(wishPictureResponse).isNotNull();
        위시_사진_삭제(wish.id(), ownerAuthToken.token());
        위시_삭제(wish.id(), ownerAuthToken.token());

        // 픽잇 생성 및 방 단위 픽잇 조회
        PickeatResponse pickeat = 방에서_픽잇_생성(room.id(), new PickeatRequest("커버리지 점심 픽잇"), ownerAuthToken.token());
        List<PickeatResponse> pickeatsInRoom = 방의_픽잇_목록_조회(room.id(), ownerAuthToken.token());
        assertThat(pickeatsInRoom).extracting(PickeatResponse::id).contains(pickeat.id());
        List<PickeatResponse> activePickeatsInRoom = 방의_활성_픽잇_목록_조회(room.id(), ownerAuthToken.token());
        assertThat(activePickeatsInRoom).extracting(PickeatResponse::id).contains(pickeat.id());
        List<PickeatResponse> pickeatsByUser = 유저가_속한_픽잇_목록_조회(ownerAuthToken.token());
        assertThat(pickeatsByUser).extracting(PickeatResponse::id).contains(pickeat.id());

        // 픽잇 재참여 가능 여부 조회 (참가자 없이)
        PickeatResponse pickeatInfo = 픽잇_정보_조회(pickeat.code());
        PickeatRejoinAvailableResponse rejoinAvailable = 픽잇_재참여_가능_여부_조회(pickeatInfo.code());
        assertThat(rejoinAvailable).isNotNull();

        // 참가자 생성 및 참가자 단건 조회/완료 처리
        TokenResponse participantToken = 참가자_생성(new ParticipantRequest("참여자1", pickeatInfo.id()));
        ParticipantResponse participantInfo = 참가자_정보_조회(participantToken.token());
        assertThat(participantInfo.nickname()).isEqualTo("참여자1");
        참가자_선택_완료_표시(participantToken.token());
        참가자_선택_완료_표시_취소(participantToken.token());

        // 참가중인 픽잇 조회
        PickeatResponse participatingPickeat = 참가중인_픽잇_조회(participantToken.token());
        assertThat(participatingPickeat.code()).isEqualTo(pickeatInfo.code());

        // 방 나가기
        방_나가기(room.id(), memberAuthToken.token());
        List<RoomResponse> roomsAfterExit = 방_전체_조회(memberAuthToken.token());
        assertThat(roomsAfterExit).extracting(RoomResponse::id).doesNotContain(room.id());

        // 템플릿 소원 목록 조회
        List<TemplateResponse> templates = 템플릿_목록_조회();
        List<TemplateWishResponse> templateWishes = 템플릿_소원_목록_조회(templates.getFirst().id());
        assertThat(templateWishes).isNotEmpty();
    }
}
