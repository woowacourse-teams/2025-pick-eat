ALTER TABLE `pickeat_result`
    DROP FOREIGN KEY `FKg5rkj84lmqukrfiuhos82thdx`;

ALTER TABLE `pickeat_result`
    DROP FOREIGN KEY `FKlkhf7ufetto289l3lyx35f39o`;

ALTER TABLE `pickeat_result`
    MODIFY COLUMN `pickeat_id` bigint NOT NULL,
    MODIFY COLUMN `restaurant_id` bigint NOT NULL;
