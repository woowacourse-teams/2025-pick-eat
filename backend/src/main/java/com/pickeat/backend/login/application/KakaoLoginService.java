package com.pickeat.backend.login.application;

import static com.pickeat.backend.global.exception.ErrorCode.USER_NOT_FOUND;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.login.infrastructure.KakaoLoginClient;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KakaoLoginService {

    private final KakaoLoginClient kakaoLoginClient;
    private final JwtOIDProvider jwtOIDProvider;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public Long getProviderIdFromIdToken(String code) {
        String idTokenJwt = kakaoLoginClient.getIdTokenFromKakao(code);
        Long providerId = jwtOIDProvider.extractProviderIdFromIdToken(idTokenJwt);

        return providerId;
    }

    public String login(Long providerId) {
        User user = userRepository.findByProviderIdAndProvider(providerId, "kakao")
                .orElseThrow(() -> new BusinessException(USER_NOT_FOUND));
        String accessToken = jwtTokenProvider.createToken(user);

        return accessToken;
    }
}
