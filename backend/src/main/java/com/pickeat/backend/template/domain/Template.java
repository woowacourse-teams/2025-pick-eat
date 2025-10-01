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
    private List<TemplateWish> wishes = new ArrayList<>();


    /**
     * Create a Template with the specified name.
     *
     * @param name the template's name; must not be null
     */
    public Template(String name) {
        this.name = name;
    }
}
