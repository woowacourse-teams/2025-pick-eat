package com.pickeat.backend.tobe.user.domain.repository;

import com.pickeat.backend.tobe.user.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByProviderIdAndProvider(Long providerId, String provider);

    boolean existsByNickname(String nickname);

    Optional<User> findByNickname(String nickname);

    List<User> findByNicknameStartsWith(String nickname);
}
