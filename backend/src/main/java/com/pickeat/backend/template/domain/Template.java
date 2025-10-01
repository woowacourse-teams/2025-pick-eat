package com.pickeat.backend.template.domain;

import com.pickeat.backend.global.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Template extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "template", cascade = CascadeType.REMOVE)
    private final List<TemplateWish> wishes = new ArrayList<>();

    public Template(String name) {
        this.name = name;
    }
}
