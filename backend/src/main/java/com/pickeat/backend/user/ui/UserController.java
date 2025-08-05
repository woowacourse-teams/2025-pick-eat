package com.pickeat.backend.user.ui;

import com.pickeat.backend.global.auth.LoginUserId;
import com.pickeat.backend.user.application.UserService;
import com.pickeat.backend.user.application.dto.UserResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pickeat.backend.user.ui.api.UserApiSpec;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
public class UserController implements UserApiSpec {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<UserResponse> getUser(@LoginUserId Long userId) {
        UserResponse response = userService.getById(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/rooms/{roomId}/users")
    public ResponseEntity<List<UserResponse>> getRoomUsers(@PathVariable("roomId") Long roomId) {
        List<UserResponse> response = userService.getByRoomId(roomId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<UserResponse>> getUsers(@RequestParam String nickname) {
        List<UserResponse> response = userService.searchByNickname(nickname);
        return ResponseEntity.ok(response);
    }
}
