package com.pickeat.backend.template.application;

import com.pickeat.backend.template.application.dto.response.TemplateWishResponse;
import com.pickeat.backend.template.domain.TemplateWish;
import com.pickeat.backend.template.domain.repository.TemplateWishRepository;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TemplateWishService {

    private final TemplateWishRepository templateWishRepository;

    /**
     * Retrieve template wishes for the specified template, ordered by creation time descending.
     *
     * @param templateId the identifier of the template whose wishes should be retrieved
     * @return a list of TemplateWishResponse representing the template's wishes ordered from newest to oldest
     */
    public List<TemplateWishResponse> getWishesFromTemplates(Long templateId) {
        List<TemplateWish> wishes = templateWishRepository.findAllByTemplateId(templateId);
        wishes.sort(Comparator.comparing(TemplateWish::getCreatedAt).reversed());
        return TemplateWishResponse.from(wishes);
    }
}
