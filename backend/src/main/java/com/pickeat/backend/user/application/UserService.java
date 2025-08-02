package com.pickeat.backend.user.application;

import static com.pickeat.backend.global.exception.ErrorCode.ALREADY_NICKNAME_EXISTS;
import static com.pickeat.backend.global.exception.ErrorCode.USER_NOT_FOUND;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.login.application.dto.SignupRequest;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public boolean isUserExist(Long providerId, String provider) {
        return userRepository.existsByProviderIdAndProvider(providerId, provider);
    }

    @Transactional
    public User createUser(SignupRequest request, Long providerId, String provider) {
        validateDuplicateNickname(request.nickname());
        User user = new User(request.nickname(), providerId, provider);
        return userRepository.save(user);
    }

    private void validateDuplicateNickname(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            throw new BusinessException(ALREADY_NICKNAME_EXISTS);
        }
    }

    public User findByNickName(String nickname) {
        return userRepository.findByNickname(nickname)
                .orElseThrow(() -> new BusinessException(USER_NOT_FOUND));
    }
}
