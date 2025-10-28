package com.pickeat.backend.login.ui;

import com.pickeat.backend.global.auth.annotation.Provider;
import com.pickeat.backend.global.auth.principal.ProviderPrincipal;
import com.pickeat.backend.login.application.LoginService;
import com.pickeat.backend.login.application.ProviderTokenProvider;
import com.pickeat.backend.login.application.dto.request.AuthCodeRequest;
import com.pickeat.backend.login.application.dto.request.SignupRequest;
import com.pickeat.backend.login.application.dto.response.TokenResponse;
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
@RequestMapping("/api/v1/auth")
public class LoginController implements LoginApiSpec {

    private final LoginService loginService;
    private final UserService userService;
    private final ProviderTokenProvider providerTokenProvider;

    @Override
    @PostMapping("/code")
    public ResponseEntity<TokenResponse> processCode(@Valid @RequestBody AuthCodeRequest request) {
        Long providerId = loginService.getProviderIdFromIdToken(request);

        TokenResponse response = providerTokenProvider.createToken(providerId, request.provider());

        if (!userService.isUserExist(providerId, request.provider())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
        return ResponseEntity.ok().body(response);
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Provider ProviderPrincipal providerPrincipal) {
        TokenResponse response = loginService.login(providerPrincipal);

        return ResponseEntity.ok().body(response);
    }

    @Override
    @PostMapping("/signup")
    public ResponseEntity<TokenResponse> signup(@Valid @RequestBody SignupRequest request,
                                                @Provider ProviderPrincipal providerPrincipal) {
        userService.createUser(request, providerPrincipal);

        TokenResponse response = loginService.login(providerPrincipal);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
