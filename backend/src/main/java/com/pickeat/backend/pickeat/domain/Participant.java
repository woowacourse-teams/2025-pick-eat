package com.pickeat.backend.pickeat.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Participant extends BaseEntity {

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Boolean isCompleted = false;

    @ManyToOne
    @JoinColumn(name = "pickeat_id", nullable = false)
    private Pickeat pickeat;

    public Participant(String nickname, Pickeat pickeat) {
        this.nickname = nickname;
        this.pickeat = pickeat;
    }

    public void updateCompletionAs(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
