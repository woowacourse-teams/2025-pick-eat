package com.pickeat.backend.template.application;

import com.pickeat.backend.template.application.dto.response.TemplateResponse;
import com.pickeat.backend.template.domain.Template;
import com.pickeat.backend.template.domain.repository.TemplateRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    public List<TemplateResponse> getTemplates(Long startId, Integer size) {
        Pageable pageable = PageRequest.of(0, size, Sort.by("id").ascending());
        Slice<Template> templates = templateRepository.findByIdGreaterThan(startId, pageable);
        return TemplateResponse.from(templates.toList());
    }
}
