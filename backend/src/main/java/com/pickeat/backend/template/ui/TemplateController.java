package com.pickeat.backend.template.ui;

import com.pickeat.backend.template.application.TemplateService;
import com.pickeat.backend.template.application.dto.response.TemplateResponse;
import com.pickeat.backend.template.ui.api.TemplateApiSpec;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class TemplateController implements TemplateApiSpec {

    private final TemplateService templateService;

    @Override
    @GetMapping("/templates")
    public ResponseEntity<List<TemplateResponse>> getTemplates() {
        List<TemplateResponse> templates = templateService.getTemplates();
        return ResponseEntity.ok(templates);
    }
}
