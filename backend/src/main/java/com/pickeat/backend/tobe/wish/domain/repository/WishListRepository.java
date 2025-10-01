package com.pickeat.backend.tobe.wish.domain.repository;

import com.pickeat.backend.tobe.wish.domain.WishList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishList, Long> {

    Optional<WishList> findByRoomIdAndIsTemplate(Long roomId, Boolean isTemplate);

    List<WishList> findAllByIsTemplateTrue();
}
