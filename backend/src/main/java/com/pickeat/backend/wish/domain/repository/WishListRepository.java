package com.pickeat.backend.wish.domain.repository;

import com.pickeat.backend.wish.domain.WishList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishList, Long> {

    List<WishList> findAllByRoomIdAndIsPublic(Long roomId, Boolean isPublic);

    List<WishList> findAllByIsPublicTrue();
}
