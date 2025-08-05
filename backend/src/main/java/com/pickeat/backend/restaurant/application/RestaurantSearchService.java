package com.pickeat.backend.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.restaurant.application.dto.request.LocationRestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.restaurant.application.dto.request.RestaurantSearchRequest;
import com.pickeat.backend.restaurant.application.dto.request.WishRestaurantRequest;
import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishList;
import com.pickeat.backend.wish.domain.WishPicture;
import com.pickeat.backend.wish.domain.repository.WishListRepository;
import com.pickeat.backend.wish.domain.repository.WishPictureRepository;
import com.pickeat.backend.wish.domain.repository.WishRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RestaurantSearchService {

    private static final int RESTAURANT_SEARCH_SIZE = 10;
    private final RestaurantSearchClient restaurantSearchClient;
    private final WishListRepository wishListRepository;
    private final WishRepository wishRepository;
    private final WishPictureRepository wishPictureRepository;

    //TODO: 분명 개선 여지가 있을텐데... + 테스트 (2025-07-21, 월, 20:32)
    public List<RestaurantRequest> searchByLocation(LocationRestaurantRequest request) {
        Double x = request.x();
        Double y = request.y();
        int radius = request.radius();

        List<RestaurantRequest> requests = new ArrayList<>();
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("한식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("양식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("중식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("일식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("패스트푸드", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("아시안음식", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("도시락", x, y, radius, RESTAURANT_SEARCH_SIZE)));
        requests.addAll(restaurantSearchClient.getRestaurants(
                new RestaurantSearchRequest("분식", x, y, radius, RESTAURANT_SEARCH_SIZE)));

        return requests;
    }

    public List<RestaurantRequest> searchByWish(WishRestaurantRequest request) {
        WishList wishList = getWishList(request);

        List<Wish> wishes = wishRepository.findAllByWishList(wishList);
        List<RestaurantRequest> requests = wishes.stream()
                .map(wish -> RestaurantRequest.fromWish(wish, getPictureUrls(wish)))
                .toList();

        return requests;
    }

    private WishList getWishList(WishRestaurantRequest request) {
        return wishListRepository.findById(request.wishListId())
                .orElseThrow(() -> new BusinessException(ErrorCode.WISHLIST_NOT_FOUND));
    }

    private String getPictureUrls(Wish wish) {
        return wishPictureRepository.findAllByWish(wish).stream()
                .map(WishPicture::getDownloadUrl) // 혹은 getFileName 등
                .collect(Collectors.joining(","));
    }
}
