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
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile({"dev", "local"})
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;
    private final WishListRepository wishListRepository;
    private final WishRepository wishRepository;

    @Override
    public void run(String... args) {
        User user = userRepository.save(new User("운영자", 1L, "SERVER"));
        Room room = roomRepository.save(new Room("운영자 Room"));
        RoomUser roomUser = roomUserRepository.save(new RoomUser(room, user));

        WishList jamsilWishList = wishListRepository.save(new WishList("잠실", room.getId(), true));
        wishRepository.save(new Wish("맛집1", FoodCategory.KOREAN, "도로명주소", "태그1,태그2", jamsilWishList));
        WishList sunRungWishList = wishListRepository.save(new WishList("선릉", room.getId(), true));
        wishRepository.save(new Wish("맛집2", FoodCategory.KOREAN, "도로명주소", "태그1,태그2", sunRungWishList));
    }
}
