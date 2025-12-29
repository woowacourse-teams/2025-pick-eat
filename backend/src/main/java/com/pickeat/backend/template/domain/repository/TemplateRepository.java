package com.pickeat.backend.template.domain.repository;

import com.pickeat.backend.template.domain.Template;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface TemplateRepository extends JpaRepository<Template, Long> {

    Slice<Template> findByIdGreaterThan(
            @Param("id") Long cursorId,
            Pageable pageable
    );
}
