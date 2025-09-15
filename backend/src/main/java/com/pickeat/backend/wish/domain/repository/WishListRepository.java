package com.pickeat.backend.wish.domain.repository;

import com.pickeat.backend.wish.domain.WishList;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishList, Long> {

    WishList findByRoomIdAndIsTemplate(Long roomId, Boolean isTemplate);

    List<WishList> findAllByIsTemplateTrue();
}
