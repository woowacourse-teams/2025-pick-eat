package com.pickeat.backend.tobe.user.application;

import com.pickeat.backend.global.auth.principal.ProviderPrincipal;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.tobe.room.domain.repository.RoomUserRepository;
import com.pickeat.backend.tobe.user.application.dto.UserResponse;
import com.pickeat.backend.tobe.user.domain.repository.UserRepository;
import com.pickeat.backend.user.domain.User;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("UserServiceV2")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final RoomUserRepository roomUserRepository;

    public boolean isUserExist(Long providerId, String provider) {
        return userRepository.existsByProviderIdAndProvider(providerId, provider);
    }

    @Transactional
    public UserResponse createUser(SignupRequest request, ProviderPrincipal providerPrincipal) {
        validateDuplicateNickname(request.nickname());
        User user = new User(request.nickname(), providerPrincipal.providerId(), providerPrincipal.provider());
        userRepository.save(user);
        return UserResponse.from(user);
    }

    //TODO: 이미 방에 참여중인지 구분이 필요할지.. (2025-08-5, 화, 17:44)
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
        List<User> users = userRepository.findByNicknameStartsWith(nickname);

        // 정확히 일치하는 닉네임을 맨 앞에 정렬
        users.sort(Comparator.comparing(user -> !user.getNickname().equals(nickname)));

        return UserResponse.from(users);
    }

    public List<UserResponse> getByRoomId(Long roomId) {
        List<User> users = roomUserRepository.getAllUserByRoomId(roomId);
        return UserResponse.from(users);
    }
}
