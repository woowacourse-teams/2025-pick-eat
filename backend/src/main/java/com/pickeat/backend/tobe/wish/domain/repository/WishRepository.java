package com.pickeat.backend.tobe.wish.domain.repository;

import com.pickeat.backend.tobe.wish.domain.Wish;
import com.pickeat.backend.tobe.wish.domain.WishList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishRepository extends JpaRepository<Wish, Long> {

    List<Wish> findAllByWishList(WishList wishList);
}
