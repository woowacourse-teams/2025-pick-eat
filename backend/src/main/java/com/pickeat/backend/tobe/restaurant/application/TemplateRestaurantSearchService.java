package com.pickeat.backend.tobe.restaurant.application;

import com.pickeat.backend.global.exception.BusinessException;
import com.pickeat.backend.global.exception.ErrorCode;
import com.pickeat.backend.template.domain.Template;
import com.pickeat.backend.template.domain.TemplateWish;
import com.pickeat.backend.template.domain.repository.TemplateRepository;
import com.pickeat.backend.template.domain.repository.TemplateWishRepository;
import com.pickeat.backend.tobe.restaurant.application.dto.request.RestaurantRequest;
import com.pickeat.backend.tobe.restaurant.application.dto.request.TemplateRestaurantRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("TemplateRestaurantSearchServiceV2")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TemplateRestaurantSearchService {

    private final TemplateRepository templateRepository;
    private final TemplateWishRepository templateWishRepository;

    public List<RestaurantRequest> searchByTemplate(TemplateRestaurantRequest request) {
        Template template = getTemplateById(request.templateId());
        List<TemplateWish> templateWishes = getTemplateWishById(template);
        return templateWishes.stream()
                .map(RestaurantRequest::fromTemplateWish)
                .toList();
    }

    public Template getTemplateById(Long id) {
        return templateRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.TEMPLATE_NOT_FOUND));
    }

    public List<TemplateWish> getTemplateWishById(Template template) {
        return templateWishRepository.findAllByTemplateId(template.getId());
    }
}
