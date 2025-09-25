ALTER TABLE `participant`
    ADD COLUMN `is_completed` bit(1) NULL COMMENT 'New column for is_elimination_completed';

ALTER TABLE `wish_list`
    ADD COLUMN `is_template` bit(1) NULL COMMENT 'New column for is_public';

ALTER TABLE `wish`
    ADD COLUMN `place_url` varchar(255) DEFAULT NULL;

UPDATE `participant`
SET `is_completed` = `is_elimination_completed`;

UPDATE `wish_list`
SET `is_template` = `is_public`;

ALTER TABLE `participant`
    MODIFY COLUMN `is_completed` bit(1) NOT NULL;

ALTER TABLE `wish_list`
    MODIFY COLUMN `is_template` bit(1) NOT NULL;
