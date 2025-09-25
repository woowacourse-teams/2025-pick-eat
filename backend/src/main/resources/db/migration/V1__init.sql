CREATE TABLE `room`
(
    `id`         bigint       NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6)  NOT NULL,
    `updated_at` datetime(6)  NOT NULL,
    `name`       varchar(255) NOT NULL,
    `deleted`    bit(1)       NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 54
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `users`
(
    `id`          bigint       NOT NULL AUTO_INCREMENT,
    `created_at`  datetime(6)  NOT NULL,
    `updated_at`  datetime(6)  NOT NULL,
    `nickname`    varchar(255) NOT NULL,
    `provider`    varchar(255) NOT NULL,
    `provider_id` bigint       NOT NULL,
    `deleted`     bit(1)       NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK2ty1xmrrgtn89xt7kyxx6ta7h` (`nickname`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 20
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `room_user`
(
    `id`         bigint      NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6) NOT NULL,
    `updated_at` datetime(6) NOT NULL,
    `room_id`    bigint      NOT NULL,
    `user_id`    bigint      NOT NULL,
    `deleted`    bit(1)      NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    KEY `FKtakjqllocgakgw0os4hygxfk1` (`room_id`),
    KEY `FKaqm4k7a8o6lq80j3l1rls58ux` (`user_id`),
    CONSTRAINT `FKaqm4k7a8o6lq80j3l1rls58ux` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    CONSTRAINT `FKtakjqllocgakgw0os4hygxfk1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 79
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `pickeat`
(
    `id`                bigint       NOT NULL AUTO_INCREMENT,
    `created_at`        datetime(6)  NOT NULL,
    `updated_at`        datetime(6)  NOT NULL,
    `code`              binary(16)   NOT NULL,
    `is_active`         bit(1)       NOT NULL,
    `name`              varchar(255) NOT NULL,
    `participant_count` int          NOT NULL,
    `room_id`           bigint DEFAULT NULL,
    `deleted`           bit(1)       NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    UNIQUE KEY `UKtb4bxvpir5n2b90ov753n5f2g` (`code`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 542
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `participant`
(
    `id`                       bigint       NOT NULL AUTO_INCREMENT,
    `created_at`               datetime(6)  NOT NULL,
    `updated_at`               datetime(6)  NOT NULL,
    `is_elimination_completed` bit(1)       NOT NULL,
    `nickname`                 varchar(255) NOT NULL,
    `pickeat_id`               bigint       NOT NULL,
    `deleted`                  bit(1)       NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    KEY `FKt0fy0xdd97i4u9om07urapp6g` (`pickeat_id`),
    CONSTRAINT `FKt0fy0xdd97i4u9om07urapp6g` FOREIGN KEY (`pickeat_id`) REFERENCES `pickeat` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 547
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `restaurant`
(
    `id`                bigint                                                  NOT NULL AUTO_INCREMENT,
    `created_at`        datetime(6)                                             NOT NULL,
    `updated_at`        datetime(6)                                             NOT NULL,
    `distance`          int          DEFAULT NULL,
    `food_category`     enum ('CHINESE','JAPANESE','KOREAN','OTHERS','WESTERN') NOT NULL,
    `is_excluded`       bit(1)                                                  NOT NULL,
    `like_count`        int                                                     NOT NULL,
    `x`                 double       DEFAULT NULL,
    `y`                 double       DEFAULT NULL,
    `name`              varchar(255)                                            NOT NULL,
    `picture_urls`      varchar(255) DEFAULT NULL,
    `place_url`         varchar(255) DEFAULT NULL,
    `road_address_name` varchar(255)                                            NOT NULL,
    `tags`              varchar(255)                                            NOT NULL,
    `type`              enum ('LOCATION','WISH')                                NOT NULL,
    `pickeat_id`        bigint                                                  NOT NULL,
    `deleted`           bit(1)                                                  NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    KEY `FK37vnutmwssokg056o36w5qax` (`pickeat_id`),
    CONSTRAINT `FK37vnutmwssokg056o36w5qax` FOREIGN KEY (`pickeat_id`) REFERENCES `pickeat` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 19871
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `restaurant_like`
(
    `id`             bigint      NOT NULL AUTO_INCREMENT,
    `created_at`     datetime(6) NOT NULL,
    `updated_at`     datetime(6) NOT NULL,
    `participant_id` bigint      NOT NULL,
    `restaurant_id`  bigint      NOT NULL,
    `deleted`        bit(1)      NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    KEY `FKh9hu6f8de93x8m2dxrqfg4v2m` (`participant_id`),
    KEY `FK2bgf3jrj4mery9cnfugy8v05n` (`restaurant_id`),
    CONSTRAINT `FK2bgf3jrj4mery9cnfugy8v05n` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
    CONSTRAINT `FKh9hu6f8de93x8m2dxrqfg4v2m` FOREIGN KEY (`participant_id`) REFERENCES `participant` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 902
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `pickeat_result`
(
    `id`             bigint      NOT NULL AUTO_INCREMENT,
    `created_at`     datetime(6) NOT NULL,
    `updated_at`     datetime(6) NOT NULL,
    `has_equal_like` bit(1)      NOT NULL,
    `pickeat_id`     bigint DEFAULT NULL,
    `restaurant_id`  bigint DEFAULT NULL,
    `deleted`        bit(1)      NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK44xseqcxipx2ss3f0jyfwuvy4` (`pickeat_id`),
    UNIQUE KEY `UKiht9mghg2shddqff8yrhyfjd1` (`restaurant_id`),
    CONSTRAINT `FKg5rkj84lmqukrfiuhos82thdx` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
    CONSTRAINT `FKlkhf7ufetto289l3lyx35f39o` FOREIGN KEY (`pickeat_id`) REFERENCES `pickeat` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 113
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `wish_list`
(
    `id`         bigint       NOT NULL AUTO_INCREMENT,
    `created_at` datetime(6)  NOT NULL,
    `updated_at` datetime(6)  NOT NULL,
    `is_public`  bit(1)       NOT NULL,
    `name`       varchar(255) NOT NULL,
    `room_id`    bigint       NOT NULL,
    `deleted`    bit(1)       NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 47
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `wish`
(
    `id`                bigint                                                  NOT NULL AUTO_INCREMENT,
    `created_at`        datetime(6)                                             NOT NULL,
    `updated_at`        datetime(6)                                             NOT NULL,
    `food_category`     enum ('CHINESE','JAPANESE','KOREAN','OTHERS','WESTERN') NOT NULL,
    `name`              varchar(255)                                            NOT NULL,
    `road_address_name` varchar(255)                                            NOT NULL,
    `tags`              varchar(255) DEFAULT NULL,
    `wish_list_id`      bigint                                                  NOT NULL,
    `deleted`           bit(1)                                                  NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    KEY `FKlco4dk9q777wn07gyhx51hjjl` (`wish_list_id`),
    CONSTRAINT `FKlco4dk9q777wn07gyhx51hjjl` FOREIGN KEY (`wish_list_id`) REFERENCES `wish_list` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 212
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `wish_picture`
(
    `id`           bigint       NOT NULL AUTO_INCREMENT,
    `created_at`   datetime(6)  NOT NULL,
    `updated_at`   datetime(6)  NOT NULL,
    `download_url` varchar(255) NOT NULL,
    `picture_key`  varchar(255) NOT NULL,
    `wish_id`      bigint       NOT NULL,
    `deleted`      bit(1)       NOT NULL COMMENT 'Soft-delete indicator',
    PRIMARY KEY (`id`),
    KEY `FKb58ffd1eqxqofoini44j5f8q9` (`wish_id`),
    CONSTRAINT `FKb58ffd1eqxqofoini44j5f8q9` FOREIGN KEY (`wish_id`) REFERENCES `wish` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 113
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
