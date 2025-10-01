package com.pickeat.backend.template.domain.repository;

import com.pickeat.backend.template.domain.TemplateWish;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateWishRepository extends JpaRepository<TemplateWish, Long> {

    List<TemplateWish> findAllByTemplateId(Long templateId);
}
