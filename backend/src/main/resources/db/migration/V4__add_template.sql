CREATE TABLE template
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(255) NOT NULL,
    created_at DATETIME(6)  NOT NULL,
    updated_at DATETIME(6)  NOT NULL,
    deleted    BIT(1)       NOT NULL COMMENT 'Soft-delete indicator'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE template_wish
(
    id                BIGINT PRIMARY KEY AUTO_INCREMENT,
    template_id       BIGINT                                                  NOT NULL,
    name              VARCHAR(255)                                            NOT NULL,
    food_category     ENUM ('CHINESE','JAPANESE','KOREAN','OTHERS','WESTERN') NOT NULL,
    distance          INT                                                     NOT NULL,
    road_address_name VARCHAR(255)                                            NOT NULL,
    place_url         VARCHAR(255)                                            NULL,
    tags              VARCHAR(255)                                            NULL,
    picture_key       VARCHAR(255)                                            NULL,
    picture_url       VARCHAR(255)                                            NULL,
    created_at        DATETIME(6)                                             NOT NULL,
    updated_at        DATETIME(6)                                             NOT NULL,
    deleted           BIT(1)                                                  NOT NULL DEFAULT 0 COMMENT 'Soft-delete indicator',

    CONSTRAINT fk_template_wish_template
        FOREIGN KEY (template_id)
            REFERENCES template (id)
            ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX idx_template_wish_template_id
    ON template_wish (template_id);

INSERT INTO template (id, name, created_at, updated_at, deleted)
SELECT id, name, created_at, updated_at, 0
FROM wish_list
WHERE is_template = 1
  AND deleted = 0;

INSERT INTO template_wish (template_id,
                           name,
                           food_category,
                           distance,
                           road_address_name,
                           place_url,
                           tags,
                           picture_key,
                           picture_url,
                           created_at,
                           updated_at,
                           deleted)
SELECT w.wish_list_id  AS template_id,
       w.name,
       w.food_category,
       0               AS distance,
       w.road_address_name,
       NULL            AS place_url,
       w.tags,
       wp.picture_key,
       wp.download_url AS picture_url,
       w.created_at,
       w.updated_at,
       0               AS deleted
FROM wish w
         INNER JOIN wish_list wl ON w.wish_list_id = wl.id
         LEFT JOIN wish_picture wp ON w.id = wp.wish_id
    AND wp.deleted = 0
    AND wp.id = (SELECT MIN(id)
                 FROM wish_picture
                 WHERE wish_id = w.id
                   AND deleted = 0)
WHERE wl.is_template = 1
  AND wl.deleted = 0
  AND w.deleted = 0;
