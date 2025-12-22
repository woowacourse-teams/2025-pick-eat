package com.pickeat.backend.global.init;

import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile({"stress"})
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByNickname("운영자")) {
            userRepository.save(new User("운영자", 1L, "SERVER"));
            for (long i = 0; i < 100; i++) {
                userRepository.save(new User("사용자" + i, i, "SERVER"));
            }
        }
    }
}
