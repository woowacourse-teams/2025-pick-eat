package com.pickeat.backend.global.init;

import com.pickeat.backend.restaurant.domain.FoodCategory;
import com.pickeat.backend.room.domain.Room;
import com.pickeat.backend.room.domain.RoomUser;
import com.pickeat.backend.room.domain.repository.RoomRepository;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.user.domain.repository.UserRepository;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.WishPicture;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import com.pickeat.backend.wish.domain.repository.WishPictureRepository;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile({"local"})
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;
    private final WishListRepository wishListRepository;
    private final WishRepository wishRepository;
    private final WishPictureRepository wishPictureRepository;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByNickname("운영자")) {
            User user = userRepository.save(new User("운영자", 1L, "SERVER"));
            Room room = roomRepository.save(new Room("운영자 Room"));
            RoomUser roomUser = roomUserRepository.save(new RoomUser(room, user));

            // 잠실 초기 데이터
            WishList jamsilWishList = wishListRepository.save(new WishList("잠실", room.getId(), true));

            Wish jamsilWish1 = wishRepository.save(new Wish("서해바지락칼국수", FoodCategory.KOREAN,
                    "서울 송파구 올림픽로35가길 11 한신코아오피스텔 1층 112호", "칼국수, 만두, 파전", jamsilWishList));
            wishPictureRepository.save(
                    new WishPicture(jamsilWish1, "pickeat/wish_images/default_images/jamsil_template/서해바지락 칼국수.png",
                            "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EC%84%9C%ED%95%B4%EB%B0%94%EC%A7%80%EB%9D%BD+%EC%B9%BC%EA%B5%AD%EC%88%98.png"));

            Wish jamsilWish2 = wishRepository.save(new Wish("육회바른연어", FoodCategory.JAPANESE,
                    "서울 송파구 올림픽로35가길 11 한신코어오피스텔 1층 103호", "연어, 육회, 덮밥, 초밥", jamsilWishList));
            wishPictureRepository.save(
                    new WishPicture(jamsilWish2, "pickeat/wish_images/default_images/jamsil_template/육회바른연어.jpg",
                            "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EC%9C%A1%ED%9A%8C%EB%B0%94%EB%A5%B8%EC%97%B0%EC%96%B4.jpg"));

            Wish jamsilWish3 = wishRepository.save(new Wish("연어식당", FoodCategory.JAPANESE,
                    "서울 송파구 올림픽로35가길 9 잠실푸르지오월드마크 1층", "연어, 덮밥", jamsilWishList));
            wishPictureRepository.save(
                    new WishPicture(jamsilWish3, "pickeat/wish_images/default_images/jamsil_template/연어식당.jpg",
                            "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EC%97%B0%EC%96%B4%EC%8B%9D%EB%8B%B9.jpg"));

            Wish jamsilWish4 = wishRepository.save(new Wish("성화마라탕", FoodCategory.CHINESE,
                    "서울 송파구 올림픽로35가길 9 지하1층 39,40호", "마라탕, 마라샹궈, 꿔바로우", jamsilWishList));
            wishPictureRepository.save(
                    new WishPicture(jamsilWish4, "pickeat/wish_images/default_images/jamsil_template/성화마라탕.jpg",
                            "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EC%84%B1%ED%99%94%EB%A7%88%EB%9D%BC%ED%83%95.jpg"));

            Wish jamsilWish5 = wishRepository.save(new Wish("맥도날드", FoodCategory.OTHERS,
                    "서울 송파구 송파대로 558 월드타워빌딩 1층", "햄버거", jamsilWishList));
            wishPictureRepository.save(
                    new WishPicture(jamsilWish5, "pickeat/wish_images/default_images/jamsil_template/맥도날드.jpg",
                            "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EB%A7%A5%EB%8F%84%EB%82%A0%EB%93%9C.jpg"));

            Wish jamsilWish6 = wishRepository.save(new Wish("홍수계찜닭", FoodCategory.KOREAN,
                    "서울 송파구 송파대로 570 타워730 지하1층", "찜닭", jamsilWishList));
            wishPictureRepository.save(
                    new WishPicture(jamsilWish6, "pickeat/wish_images/default_images/jamsil_template/홍수계찜닭.jpg",
                            "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%ED%99%8D%EC%88%98%EA%B3%84%EC%B0%9C%EB%8B%AD.jpg"));

            // 선릉 초기 데이터
            WishList seolleungWishList = wishListRepository.save(new WishList("선릉", room.getId(), true));
            Wish seolleungWish1 = wishRepository.save(new Wish("꺼벙이분식", FoodCategory.OTHERS,
                    "서울 강남구 테헤란로63길 12 103호, 104호", "분식", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish1,
                    "pickeat/wish_images/default_images/seolleung_template/꺼벙이분식.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EA%BA%BC%EB%B2%99%EC%9D%B4%EB%B6%84%EC%8B%9D.jpg"));

            Wish seolleungWish2 = wishRepository.save(new Wish("반포식스", FoodCategory.OTHERS,
                    "서울 강남구 선릉로 518 2,3층", "쌀국수", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish2,
                    "pickeat/wish_images/default_images/seolleung_template/반포식스.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EB%B0%98%ED%8F%AC%EC%8B%9D%EC%8A%A4.jpg"));

            Wish seolleungWish3 = wishRepository.save(new Wish("숯칼 선릉 손칼국수", FoodCategory.KOREAN,
                    "서울 강남구 삼성로91길 38 1층 숯칼 숯불닭구이 칼국수", "닭갈비, 칼국수", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish3,
                    "pickeat/wish_images/default_images/seolleung_template/숯칼손칼국수.png",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EC%B9%9C%EC%B9%9C.jpg"));

            Wish seolleungWish4 = wishRepository.save(new Wish("신동궁감자탕뼈숯불구이 선릉직영점", FoodCategory.KOREAN,
                    "서울 강남구 선릉로86길 39 1층", "감자탕, 뼈숯불구이", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish4,
                    "pickeat/wish_images/default_images/seolleung_template/신동궁감자탕.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EC%8B%A0%EB%8F%99%EA%B6%81%EA%B0%90%EC%9E%90%ED%83%95.jpg"));

            Wish seolleungWish5 = wishRepository.save(new Wish("친친", FoodCategory.CHINESE,
                    "서울 강남구 테헤란로63길 12 LG에클라트 B동 1층", "마라탕면, 가지덮밥, 짜장면", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish5,
                    "pickeat/wish_images/default_images/seolleung_template/친친.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EC%B9%9C%EC%B9%9C.jpg"));

            Wish seolleungWish6 = wishRepository.save(new Wish("명정루", FoodCategory.CHINESE,
                    "서울 강남구 테헤란로70길 12 1층", "중화덮밥, 짬뽕", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish6,
                    "pickeat/wish_images/default_images/seolleung_template/명정루.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EB%AA%85%EC%A0%95%EB%A3%A8.jpg"));

            Wish seolleungWish7 = wishRepository.save(new Wish("참치여행", FoodCategory.JAPANESE,
                    "서울 강남구 테헤란로53길 22 성인빌딩 1층 101호", "초밥, 알밥, 회덮밥", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish7,
                    "pickeat/wish_images/default_images/seolleung_template/잇쇼우.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EC%9E%87%EC%87%BC%EC%9A%B0.jpg"));

            Wish seolleungWish8 = wishRepository.save(new Wish("잇쇼우", FoodCategory.JAPANESE,
                    "서울 강남구 선릉로 524 선릉대림아크로텔 1층 109호", "돈카츠, 우동", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish8,
                    "pickeat/wish_images/default_images/seolleung_template/잇쇼우.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EC%9E%87%EC%87%BC%EC%9A%B0.jpg"));

            Wish seolleungWish9 = wishRepository.save(new Wish("라피자노스트라", FoodCategory.WESTERN,
                    "서울 강남구 테헤란로 406 샹제리제센터 A동 1층 101호", "피자", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish9,
                    "pickeat/wish_images/default_images/seolleung_template/라피자노스트라.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EB%9D%BC%ED%94%BC%EC%9E%90%EB%85%B8%EC%8A%A4%ED%8A%B8%EB%9D%BC.jpg"));

            Wish seolleungWish10 = wishRepository.save(new Wish("꾸우덕", FoodCategory.WESTERN,
                    "서울 강남구 선릉로82길 16 수이빌딩 1층", "파스타", seolleungWishList));
            wishPictureRepository.save(new WishPicture(seolleungWish10,
                    "pickeat/wish_images/default_images/seolleung_template/꾸우덕 강남점.jpg",
                    "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/+seolleung_template/%EA%BE%B8%EC%9A%B0%EB%8D%95+%EA%B0%95%EB%82%A8%EC%A0%90.jpg"));

        }
    }
}
