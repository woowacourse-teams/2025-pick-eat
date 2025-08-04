package com.pickeat.backend.wish.domain.repository;

import com.pickeat.backend.wish.domain.Wish;
import com.pickeat.backend.wish.domain.WishPicture;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishPictureRepository extends JpaRepository<WishPicture, Long> {

    List<WishPicture> findAllByWish(Wish wish);
}
