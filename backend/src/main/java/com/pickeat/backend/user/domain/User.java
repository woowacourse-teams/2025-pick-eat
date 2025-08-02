package com.pickeat.backend.user.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Long providerId;

    @Column(nullable = false)
    private String provider;

    public User(String nickname, Long providerId, String provider) {
        this.nickname = nickname;
        this.providerId = providerId;
        this.provider = provider;
    }
}
