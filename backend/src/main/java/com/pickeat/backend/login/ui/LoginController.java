package com.pickeat.backend.login.ui;

import com.pickeat.backend.global.auth.JwtProvider;
import com.pickeat.backend.global.auth.ProviderInfo;
import com.pickeat.backend.global.auth.annotation.Provider;
import com.pickeat.backend.login.application.LoginService;
import com.pickeat.backend.login.application.dto.request.AuthCodeRequest;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.login.ui.api.LoginApiSpec;
import com.pickeat.backend.user.application.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
public class LoginController implements LoginApiSpec {

    private final LoginService loginService;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    @Override
    @PostMapping("/code")
    public ResponseEntity<Void> processCode(@Valid @RequestBody AuthCodeRequest request) {
        Long providerId = loginService.getProviderIdFromIdToken(request);

        String providerToken = jwtProvider.createProviderToken(providerId, request.provider());

        if (!userService.isUserExist(providerId, request.provider())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .header("Authorization", "Bearer " + providerToken)
                    .build();
        }
        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + providerToken)
                .build();
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<Void> login(@Provider ProviderInfo providerInfo) {
        String token = loginService.login(providerInfo);

        return ResponseEntity.ok()
                .header("Authorization", "Bearer " + token)
                .build();
    }

    @Override
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignupRequest request,
                                         @Provider ProviderInfo providerInfo) {
        userService.createUser(request, providerInfo);

        String accessToken = loginService.login(providerInfo);

        return ResponseEntity.status(HttpStatus.CREATED).body(accessToken);
    }
}
