package com.pickeat.backend.login.ui;

import com.pickeat.backend.login.application.LoginService;
import com.pickeat.backend.login.application.dto.AuthCodeRequest;
import com.pickeat.backend.login.application.dto.SignupRequest;
import com.pickeat.backend.login.ui.api.LoginApiSpec;
import com.pickeat.backend.user.application.UserService;
import jakarta.servlet.http.HttpSession;
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
@RequestMapping("api/v1/oauth")
public class LoginController implements LoginApiSpec {

    public final LoginService loginService;
    public final UserService userService;

    @Override
    @PostMapping("/code")
    public ResponseEntity<Void> processKakaoCode(@Valid @RequestBody AuthCodeRequest request,
                                                 HttpSession session) {
        Long providerId = loginService.getProviderIdFromIdToken(request.code());

        if (userService.isUserExist(providerId, "kakao")) {
            session.setAttribute("loginReadyProviderId", providerId);
            session.setAttribute("loginReadyProvider", "kakao");
            return ResponseEntity.ok().build();
        }

        session.setAttribute("pendingProvider", "kakao");
        session.setAttribute("pendingProviderId", providerId);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<String> login(HttpSession session) {
        //TODO: 보안 필요 null check 및 provider 검증 여부.
        Long providerId = (Long) session.getAttribute("loginReadyProviderId");
        String provider = (String) session.getAttribute("loginReadyProvider");

        String token = loginService.login(providerId, provider);
        session.invalidate();

        return ResponseEntity.ok()
                .header("Authorization", "Bearer", token)
                .build();
    }

    @Override
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignupRequest request, HttpSession session) {
        //TODO: 보안 필요 null check
        Long providerId = (Long) session.getAttribute("pendingProviderId");
        String provider = (String) session.getAttribute("pendingProvider");

        userService.createUser(request, providerId, provider);
        session.invalidate();

        String accessToken = loginService.login(providerId, provider);

        return ResponseEntity.ok().body(accessToken);
    }
}
