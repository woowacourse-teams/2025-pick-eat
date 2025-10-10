package com.pickeat.backend.template.application;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.TemplateFixture;
import com.pickeat.backend.template.application.dto.response.TemplateResponse;
import com.pickeat.backend.template.domain.Template;
import com.pickeat.backend.template.domain.repository.TemplateRepository;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {TemplateService.class})
class TemplateServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private TemplateService templateService;

    @Nested
    class 템플릿_목록_조회_케이스 {

        @Test
        void 템플릿_목록_조회_성공() {
            // given
            List<Template> templates = List.of(
                    entityManager.persist(TemplateFixture.create()),
                    entityManager.persist(TemplateFixture.create()));

            entityManager.flush();
            entityManager.clear();

            // when
            List<TemplateResponse> response = templateService.getTemplates();

            // then
            List<Long> templateIds = templates.stream()
                    .map(Template::getId)
                    .toList();
            assertThat(response)
                    .extracting(TemplateResponse::id)
                    .containsExactlyInAnyOrderElementsOf(templateIds);
        }
    }
}
