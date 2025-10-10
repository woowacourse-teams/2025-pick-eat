package com.pickeat.backend.template.domain.repository;

import com.pickeat.backend.template.domain.Template;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateRepository extends JpaRepository<Template, Long> {

}
