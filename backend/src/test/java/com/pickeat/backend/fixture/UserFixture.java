package com.pickeat.backend.fixture;

import com.pickeat.backend.user.domain.User;
import java.util.UUID;

public class UserFixture {
    public static User create() {
        // 테스트에서 여러 유저를 생성해야할 때, 닉네임 값을 유니크하게 하기 위해서 uuid 사용
        return new User(UUID.randomUUID().toString(), 1L, "테스트 provider");
    }
}
