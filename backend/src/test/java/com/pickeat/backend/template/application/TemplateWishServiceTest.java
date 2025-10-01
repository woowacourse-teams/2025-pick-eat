package com.pickeat.backend.template.application;

import static org.assertj.core.api.Assertions.assertThat;

import com.pickeat.backend.fixture.TemplateFixture;
import com.pickeat.backend.fixture.TemplateWishFixture;
import com.pickeat.backend.template.application.dto.response.TemplateWishResponse;
import com.pickeat.backend.template.domain.Template;
import com.pickeat.backend.template.domain.TemplateWish;
import com.pickeat.backend.template.domain.repository.TemplateWishRepository;
import java.util.Comparator;
import java.util.List;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@DataJpaTest
@Import(value = {TemplateWishService.class})
class TemplateWishServiceTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private TemplateWishRepository templateWishRepository;

    @Autowired
    private TemplateWishService templateWishService;

    @Nested
    class 탬플릿_목록_조회_케이스 {

        @Test
        void 탬플릿_목록_조회_성공() {
            // given
            Template template = entityManager.persist(TemplateFixture.create());
            List<TemplateWish> templateWishes = List.of(
                    entityManager.persist(TemplateWishFixture.create(template)),
                    entityManager.persist(TemplateWishFixture.create(template)));
            entityManager.flush();
            entityManager.clear();

            // when
            List<TemplateWishResponse> response = templateWishService.getWishesFromTemplates(template.getId());

            // then
            List<Long> templateWishIds = templateWishes.stream()
                    .sorted(Comparator.comparing(TemplateWish::getCreatedAt).reversed())
                    .map(TemplateWish::getId)
                    .toList();
            assertThat(response)
                    .extracting(TemplateWishResponse::id)
                    .containsExactlyElementsOf(templateWishIds);
        }
    }
}
