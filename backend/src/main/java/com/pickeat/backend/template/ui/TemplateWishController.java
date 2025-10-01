package com.pickeat.backend.template.ui;

import com.pickeat.backend.template.application.TemplateWishService;
import com.pickeat.backend.template.application.dto.response.TemplateWishResponse;
import com.pickeat.backend.template.ui.api.TemplateWishApiSpec;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TemplateWishController implements TemplateWishApiSpec {

    private final TemplateWishService templateWishService;

    @Override
    @GetMapping("/templates/{templateId}/wishes")
    public ResponseEntity<List<TemplateWishResponse>> getWishesInTemplates(
            @PathVariable("templateId") Long templateId
    ) {
        List<TemplateWishResponse> wishes = templateWishService.getWishesFromTemplates(templateId);
        return ResponseEntity.ok(wishes);
    }
}
