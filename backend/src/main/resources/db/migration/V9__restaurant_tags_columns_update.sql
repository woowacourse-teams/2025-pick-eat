ALTER TABLE `restaurant`
CHANGE COLUMN `type` `type_old` ENUM('LOCATION', 'WISH') NOT NULL;

ALTER TABLE `restaurant`
ADD COLUMN `type` VARCHAR(50) NOT NULL DEFAULT 'NORMAL';

UPDATE `restaurant`
SET `type` = `type_old`;

SET @column_exists = (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'participant'
      AND COLUMN_NAME = 'is_elimination_completed'
);

SET @sql = IF(@column_exists > 0,
    'ALTER TABLE `participant` MODIFY COLUMN `is_elimination_completed` BIT(1) NULL',
    'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
