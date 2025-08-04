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
    public ResponseEntity<Void> processCode(@Valid @RequestBody AuthCodeRequest request,
                                            HttpSession session) {
        Long providerId = loginService.getProviderIdFromIdToken(request);

        session.setAttribute("providerId", providerId);
        session.setAttribute("provider", request.provider());

        return ResponseEntity.ok().build();
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<Void> login(HttpSession session) {
        //TODO: 보안 필요 null check 및 provider 검증 여부.
        Long providerId = (Long) session.getAttribute("providerId");
        String provider = (String) session.getAttribute("provider");

        String token = loginService.login(providerId, provider);
        session.invalidate();

        return ResponseEntity.ok()
                .header("Authorization", "Bearer" + token)
                .build();
    }

    @Override
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignupRequest request, HttpSession session) {
        //TODO: 보안 필요 null check
        Long providerId = (Long) session.getAttribute("providerId");
        String provider = (String) session.getAttribute("provider");

        userService.createUser(request, providerId, provider);
        session.invalidate();

        String accessToken = loginService.login(providerId, provider);

        return ResponseEntity.status(HttpStatus.CREATED).body(accessToken);
    }
}
