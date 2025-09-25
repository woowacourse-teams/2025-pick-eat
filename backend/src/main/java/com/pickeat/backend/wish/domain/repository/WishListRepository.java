package com.pickeat.backend.wish.domain.repository;

import com.pickeat.backend.wish.domain.WishList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishList, Long> {

    Optional<WishList> findByRoomIdAndIsTemplate(Long roomId, Boolean isTemplate);

    List<WishList> findAllByIsTemplateTrue();
}
