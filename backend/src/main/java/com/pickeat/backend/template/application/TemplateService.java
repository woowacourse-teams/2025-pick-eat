package com.pickeat.backend.template.application;

import com.pickeat.backend.template.application.dto.response.TemplateResponse;
import com.pickeat.backend.template.domain.Template;
import com.pickeat.backend.template.domain.repository.TemplateRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    public List<TemplateResponse> getTemplates() {
        List<Template> templateWishList = templateRepository.findAll();
        return TemplateResponse.from(templateWishList);
    }
}
