package com.pickeat.backend.login.application;

import static com.pickeat.backend.global.exception.ErrorCode.USER_NOT_FOUND;

import com.pickeat.backend.global.auth.ProviderInfo;
import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.login.application.dto.request.AuthCodeRequest;
import com.pickeat.backend.user.domain.User;
import com.pickeat.backend.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginClient loginClient;
    private final JwtOIDProvider jwtOIDProvider;
    private final UserRepository userRepository;
    private final UserTokenProvider userTokenProvider;

    public Long getProviderIdFromIdToken(AuthCodeRequest request) {
        String idTokenJwt = loginClient.getIdToken(request.code(), request.redirectUrlType());
        Long providerId = jwtOIDProvider.extractProviderIdFromIdToken(idTokenJwt);

        return providerId;
    }

    public String login(ProviderInfo providerInfo) {
        User user = userRepository.findByProviderIdAndProvider(providerInfo.providerId(), providerInfo.provider())
                .orElseThrow(() -> new BusinessException(USER_NOT_FOUND));
        String accessToken = userTokenProvider.createToken(user.getId());

        return accessToken;
    }


}
