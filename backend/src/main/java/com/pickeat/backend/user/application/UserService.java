package com.pickeat.backend.user.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.room.domain.repository.RoomRepository;
import com.pickeat.backend.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.user.application.dto.UserResponse;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.user.domain.repository.UserRepository;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;

    public boolean isUserExist(Long providerId, String provider) {
        return userRepository.existsByProviderIdAndProvider(providerId, provider);
    }

    @Transactional
    public UserResponse createUser(SignupRequest request, Long providerId, String provider) {
        validateDuplicateNickname(request.nickname());
        User user = new User(request.nickname(), providerId, provider);
        userRepository.save(user);
        return UserResponse.from(user);
    }

    public UserResponse findByNickName(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        return UserResponse.from(user);
    }

    public UserResponse getById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        return UserResponse.from(user);
    }

    private void validateDuplicateNickname(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            throw new BusinessException(ErrorCode.ALREADY_NICKNAME_EXISTS);
        }
    }

    public List<UserResponse> searchByNickname(String nickname) {
        List<User> users = userRepository.findByNicknameContaining(nickname);

        // 정확히 일치하는 닉네임을 맨 앞에 정렬
        users.sort(Comparator.comparing(user -> !user.getNickname().equals(nickname)));

        return UserResponse.from(users);
    }

    public List<UserResponse> getByRoomId(Long roomId) {
        List<User> users = roomUserRepository.getAllUserByRoomId(roomId);
        return UserResponse.from(users);
    }
}
