package com.pickeat.backend.template.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Template extends BaseEntity {

    @Column(nullable = false)
    private String name;

    public Template(String name) {
        this.name = name;
    }
}
