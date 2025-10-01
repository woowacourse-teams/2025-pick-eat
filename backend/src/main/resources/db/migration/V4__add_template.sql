CREATE TABLE template
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    NULL,
    updated_at TIMESTAMP    NULL
);

CREATE TABLE template_wish
(
    id                BIGINT PRIMARY KEY AUTO_INCREMENT,
    template_id       BIGINT       NOT NULL,

    name              VARCHAR(255) NOT NULL,
    food_category     VARCHAR(255) NOT NULL,
    distance          INT          NOT NULL,
    road_address_name VARCHAR(255) NOT NULL,
    place_url         VARCHAR(255) NULL,
    tags              VARCHAR(255) NULL,

    picture_key       VARCHAR(255) NULL,
    picture_url       VARCHAR(255) NULL,

    created_at        TIMESTAMP    NULL,
    updated_at        TIMESTAMP    NULL,

    CONSTRAINT fk_template_wish_template
        FOREIGN KEY (template_id)
            REFERENCES template (id)
            ON DELETE CASCADE
);

CREATE INDEX idx_template_wish_template_id
    ON template_wish (template_id);
