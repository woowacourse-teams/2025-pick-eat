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

    /**
     * Fetches all wishes associated with the specified template.
     *
     * @param templateId the identifier of the template whose wishes are requested
     * @return a ResponseEntity whose body is a list of TemplateWishResponse objects for the specified template (HTTP 200 OK)
     */
    @Override
    @GetMapping("/templates/{templateId}/wishes")
    public ResponseEntity<List<TemplateWishResponse>> getWishesInTemplates(
            @PathVariable("templateId") Long templateId
    ) {
        List<TemplateWishResponse> wishes = templateWishService.getWishesFromTemplates(templateId);
        return ResponseEntity.ok(wishes);
    }
}
