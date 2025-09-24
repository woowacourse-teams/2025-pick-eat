package com.pickeat.backend;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.pickeat.backend.global.auth.ProviderInfo;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.pickeat.application.ParticipantService;
import com.pickeat.backend.pickeat.application.PickeatResultService;
import com.pickeat.backend.pickeat.application.PickeatService;
import com.pickeat.backend.pickeat.application.dto.request.ParticipantRequest;
import com.pickeat.backend.pickeat.application.dto.request.PickeatRequest;
import com.pickeat.backend.restaurant.application.RestaurantSearchFacade;
import com.pickeat.backend.restaurant.application.RestaurantService;
import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantExcludeRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.room.application.RoomService;
import com.pickeat.backend.room.application.dto.request.RoomInvitationRequest;
import com.pickeat.backend.room.application.dto.request.RoomRequest;
import com.pickeat.backend.user.application.UserService;
import com.pickeat.backend.wish.application.WishListService;
import com.pickeat.backend.wish.application.WishPictureService;
import com.pickeat.backend.wish.application.WishService;
import com.pickeat.backend.wish.application.dto.request.WishListRequest;
import com.pickeat.backend.wish.application.dto.request.WishRequest;
import com.pickeat.backend.wish.application.dto.request.WishUpdateRequest;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
@Sql("/query-test.sql")
public class JpaQueryTest {

    @Autowired
    private PickeatResultService pickeatResultService;
    @Autowired
    private ParticipantService participantService;
    @Autowired
    private PickeatService pickeatService;
    @Autowired
    private RestaurantSearchFacade restaurantSearchFacade;
    @Autowired
    private RestaurantService restaurantService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private UserService userService;
    @Autowired
    private WishListService wishListService;
    @Autowired
    private WishPictureService wishPictureService;
    @Autowired
    private WishService wishService;

    @Nested
    class 참가자_서비스_테스트 {
        @Test
        void createParticipant() {
            // given
            ParticipantRequest request = new ParticipantRequest("후후", 1L);
            // when
            participantService.createParticipant(request);
            // 3
        }

        @Test
        void getParticipantBy() {
            // given
            Long participantId = 1L;
            // when
            participantService.getParticipantBy(participantId);
            // 1
        }

        @Test
        void updateCompletion() {
            // given
            Long participantId = 1L;
            boolean isCompleted = true;
            // when
            participantService.updateCompletion(participantId, isCompleted);
            // 2
        }
    }

    @Nested
    class 픽잇_결과_서비스_테스트 {

        @Test
        void createPickeatResult() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";
            Long participantId = 1L;

            // when
            pickeatResultService.createPickeatResult(pickeatCode, participantId);
            // 4
        }

        @Test
        void getPickeatResult() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";
            Long participantId = 1L;

            // when
            pickeatResultService.getPickeatResult(pickeatCode, participantId);
            // 4
        }
    }

    @Nested
    class 픽잇_서비스_테스트 {
        @Test
        void createPickeatWithoutRoom() {
            // given
            PickeatRequest request = new PickeatRequest("야호");
            // when
            pickeatService.createPickeatWithoutRoom(request);
            // 1
        }

        @Test
        void createPickeatWithRoom() {
            // given
            Long roomId = 1L;
            Long userId = 1L;
            PickeatRequest request = new PickeatRequest("야호");

            // when
            pickeatService.createPickeatWithRoom(roomId, userId, request);

            // 2
        }

        @Test
        void deactivatePickeat() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";
            Long participantId = 1L;
            // when
            pickeatService.deactivatePickeat(pickeatCode, participantId);
            // 4
        }

        @Test
        void getParticipantStateSummary() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";

            // when
            pickeatService.getParticipantStateSummary(pickeatCode);
            // 2
        }

        @Test
        void getPickeat() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";

            // when
            pickeatService.getPickeat(pickeatCode);
            // 1
        }

        @Test
        void getPickeatState() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";

            // when
            pickeatService.getPickeatState(pickeatCode);
            // 1
        }

        @Test
        void getActivePickeatInRoom() {
            // given
            Long roomId = 1L;
            Long userId = 1L;

            // when
            pickeatService.getActivePickeatInRoom(roomId, userId);
            // 2
        }

        @Test
        void getRejoinAvailableToPickeat() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";
            Long participantId = 1L;

            // when
            pickeatService.getRejoinAvailableToPickeat(pickeatCode, participantId);
            // 1
        }

        //TODO: 확인 요망  (2025-09-24, 수, 1:1)
        @Test
        void getActivePickeatsByUser() {
            // given
            Long userId = 1L;
            // when
            pickeatService.getActivePickeatsByUser(userId);
            // 5
        }

        @Test
        void getActivePickeatsByParticipant() {
            // given
            Long participantId = 1L;
            // when
            pickeatService.getActivePickeatsByParticipant(participantId);
            // 1
        }
    }


    @Nested
    class 식당_탐색_퍼사드 {
        //TODO: 이게 제일 레전드 이제 할 때 됐다  (2025-09-24, 수, 1:10)
        @Test
        void searchByLocation() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";
            double x = 127.09431687965;
            double y = 37.513272317072;
            LocationRestaurantRequest restaurantRequest = new LocationRestaurantRequest(x,
                    y, 300);
            // when
            restaurantSearchFacade.searchByLocation(restaurantRequest, pickeatCode);
            // 81 ㅋㅋ
        }

        //TODO: 만만치않아  (2025-09-24, 수, 1:10)
        @Test
        void searchByWish() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";
            WishRestaurantRequest restaurantRequest = new WishRestaurantRequest(1L);
            // when
            restaurantSearchFacade.searchByWish(restaurantRequest, pickeatCode);
            // 13 ㅋㅋ
        }
    }

    @Nested
    class 식당_서비스 {
        //TODO: 확인필요  (2025-09-24, 수, 1:15)
        @Test
        void getPickeatRestaurants() {
            // given
            String pickeatCode = "123e4567-e89b-12d3-a456-426614174000";
            Boolean isExcluded = false;
            Long participantId = 1L;
            // when
            restaurantService.getPickeatRestaurants(pickeatCode, isExcluded, participantId);
            // 7
        }

        //TODO: 확인  (2025-09-24, 수, 1:17)
        @Test
        void exclude() {
            // given
            RestaurantExcludeRequest restaurantExcludeRequest = new RestaurantExcludeRequest(List.of(1L, 2L, 3L, 4L));
            Long participantId = 1L;
            // when
            restaurantService.exclude(restaurantExcludeRequest, participantId);

            // 6
        }

        //TODO: 생각보다 적은데 데이터 잘못넣은듯 구현보면 N+1이 안나올수가없는데  (2025-09-24, 수, 1:20)
        @Test
        void like() {
            // given
            Long restaurantId = 1L;
            Long participantId = 1L;

            // when
            restaurantService.like(restaurantId, participantId);

            // 5
        }

        @Test
        void cancelLike() {
            // given
            Long restaurantId = 1L;
            Long participantId = 1L;

            // when
            restaurantService.cancelLike(restaurantId, participantId);

            // 아 데이터 안넣었다 좋아요는 근데 이건 굳이?
        }
    }

    @Nested
    class 방_서비스 {
        //TODO: 많은데?  (2025-09-24, 수, 10:5)
        @Test
        void createRoom() {
            // given
            RoomRequest roomRequest = new RoomRequest("깔깔");
            Long userId = 1L;
            // when
            roomService.createRoom(roomRequest, userId);
            // 5
        }

        //TODO: 많네 이것도  (2025-09-24, 수, 10:8)
        @Test
        void getRoom() {
            // given
            Long roomId = 1L;
            Long userId = 1L;
            // when
            roomService.getRoom(roomId, userId);

            // 6
        }

        //TODO: 방 조회될때 위시리스트 같이 조회돼서 오류 -> 어짜피 고쳐질 메서드인듯?  (2025-09-24, 수, 10:15)
        @Test
        void getAllRoom() {
            // given
            Long userId = 1L;
            // when
            roomService.getAllRoom(userId);
            //
        }

        //TODO: 확인  (2025-09-24, 수, 12:0)
        @Test
        void inviteUsers() {
            // given
            Long roomId = 1L;
            Long userId = 1L;
            RoomInvitationRequest request = new RoomInvitationRequest(List.of(1L, 2L, 3L));
            // when
            roomService.inviteUsers(roomId, userId, request);
            // 9
        }
    }

    @Nested
    class 유저_서비스 {
        @Test
        void isUserExist() {
            // given
            Long providerId = 1L;
            String provider = "LOCAL";
            // when
            userService.isUserExist(providerId, provider);
            // 1
        }

        @Test
        void createUser() {
            // given
            SignupRequest request = new SignupRequest("야호");
            ProviderInfo providerInfo = new ProviderInfo(4L, "TEST");
            // when
            userService.createUser(request, providerInfo);

            // 2
        }

        @Test
        void findByNickName() {
            // given
            String nickName = "user1";
            // when
            userService.findByNickName(nickName);

            // 1
        }

        @Test
        void getById() {
            // given

            // when
            userService.getById(1L);
            // 1
        }

        @Test
        void searchByNickname() {
            // given
            String nickName = "user";
            // when
            userService.searchByNickname(nickName);

            // 1
        }

        //TODO: 이것도 N+1인듯 아닌가 (2025-09-24, 수, 12:22)
        @Test
        void getByRoomId() {
            // given
            Long roomId = 1L;
            // when
            userService.getByRoomId(roomId);
            // 4
        }
    }

    // 여기는 사라질 api들이라 좀 애매하긴해
    @Nested
    class 위시리스트_서비스 {
        @Test
        void createWishList() {
            // given
            Long roomId = 3L;
            Long userId = 1L;
            WishListRequest request = new WishListRequest("야호야호");
            // when
            wishListService.createWishList(roomId, userId, request);
            // 2
        }

        @Test
        void getWishList() {
            // given
            Long roomId = 1L;
            Long userId = 1L;

            // when
            wishListService.getWishList(roomId, userId);
            // 3
        }

        //TODO: 흠  (2025-09-24, 수, 12:31)
        @Test
        void getTemplateWishLists() {
            // given
            wishListService.getTemplateWishLists();

            // 2
        }

        //TODO: ?? 이거 레전든데  (2025-09-24, 수, 12:33)
        @Test
        void deleteWishList() {
            // given
            Long wishListId = 1L;
            Long userId = 1L;
            // when
            wishListService.deleteWishList(wishListId, userId);
            // 24
        }
    }

    @Nested
    class 위시_사진_서비스 {

        //TODO: 음  (2025-09-24, 수, 12:40)
        @Test
        void createWishPicture() {
            // given
            Long wishId = 1L;
            Long userId = 1L;
            // when
            wishPictureService.createWishPicture(wishId, userId,
                    List.of(makeMockImageFile(), makeMockImageFile(), makeMockImageFile()));
            // 6
        }

        MultipartFile makeMockImageFile() {
            MultipartFile mockFile = mock(MultipartFile.class);
            when(mockFile.getContentType()).thenReturn("image/jpeg");
            return mockFile;
        }

        //TODO: 오우  (2025-09-24, 수, 12:41)
        @Test
        void deleteWishPictures() {
            // given
            Long wishId = 1L;
            Long userId = 1L;
            // when
            wishPictureService.deleteWishPictures(wishId, userId);

            // 6
        }

        //TODO: 후후  (2025-09-24, 수, 12:44)
        @Test
        void updateWishPictures() {
            // given
            Long wishId = 1L;
            Long userId = 1L;
            // when
            wishPictureService.updateWishPictures(wishId, userId,
                    List.of(makeMockImageFile(), makeMockImageFile(), makeMockImageFile()));
            // 9
        }
    }

    @Nested
    class 위시_서비스 {
        @Test
        void createWish() {
            // given
            Long wishId = 1L;
            WishRequest request = new WishRequest("후후", "KOREAN", "여기", List.of("ㅇㅇ", "ㅇㅇㅇ"), "저기");
            Long userId = 1L;
            // when
            wishService.createWish(wishId, request, userId);
            // 3
        }

        //TODO: 캐스케이드는 대부분 문제이긴한듯  (2025-09-24, 수, 12:51)
        @Test
        void deleteWish() {
            // given
            Long wishId = 1L;
            Long userId = 1L;
            // when
            wishService.deleteWish(wishId, userId);
            // 7
        }

        //TODO: 확인  (2025-09-24, 수, 12:54)
        @Test
        void updateWish() {
            // given
            Long wishId = 1L;
            WishUpdateRequest request = new WishUpdateRequest("후후", "KOREAN", "여기", List.of("ㅇㅇ", "ㅇㅇㅇ"), "저기");
            Long userId = 1L;
            // when
            wishService.updateWish(wishId, userId, request);
            // 5
        }

        //TODO: 확신의 N + 1  (2025-09-24, 수, 12:55)
        @Test
        void getWishes() {
            // given
            Long wishListId = 1L;
            Long userId = 1L;
            // when
            wishService.getWishes(wishListId, userId);

            // 8
        }

        //TODO: 확인  (2025-09-24, 수, 12:56)
        @Test
        void getWishesFromTemplates() {
            // given
            Long wishListId = 2L;
            // when
            wishService.getWishesFromTemplates(wishListId);
            // 2
        }
    }
}
