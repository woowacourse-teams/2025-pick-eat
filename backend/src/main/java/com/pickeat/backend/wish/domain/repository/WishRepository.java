package com.pickeat.backend.wish.domain.repository;

import com.pickeat.backend.wish.domain.Wish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishRepository extends JpaRepository<Wish, Long> {

}
