package com.pickeat.backend.fixture;

import com.pickeat.backend.template.domain.Template;

public class TemplateFixture {

    /**
     * Creates a Template test fixture.
     *
     * <p>The returned Template is initialized with the name "탬플릿".</p>
     *
     * @return a Template initialized with the name "탬플릿"
     */
    public static Template create() {
        return new Template("탬플릿");
    }
}
