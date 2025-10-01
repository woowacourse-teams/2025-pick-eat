package com.pickeat.backend.template.domain.repository;

import com.pickeat.backend.template.domain.TemplateWish;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateWishRepository extends JpaRepository<TemplateWish, Long> {

    /**
 * Retrieves all TemplateWish entities associated with the given template identifier.
 *
 * @param templateId the identifier of the template whose wishes to retrieve
 * @return a list of TemplateWish objects matching the specified templateId
 */
List<TemplateWish> findAllByTemplateId(Long templateId);
}
