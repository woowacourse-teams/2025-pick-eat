ALTER TABLE `restaurant`
    DROP FOREIGN KEY `FK37vnutmwssokg056o36w5qax`;

SET @restaurant_fk_index := 'FK37vnutmwssokg056o36w5qax';
SET @drop_restaurant_index_sql := (
    SELECT IF(EXISTS (
                      SELECT 1
                      FROM INFORMATION_SCHEMA.STATISTICS
                      WHERE TABLE_SCHEMA = DATABASE()
                        AND TABLE_NAME = 'restaurant'
                        AND INDEX_NAME = @restaurant_fk_index
                  ),
                  CONCAT('ALTER TABLE `restaurant` DROP INDEX `', @restaurant_fk_index, '`'),
                  'SELECT 1')
);

PREPARE drop_restaurant_index_stmt FROM @drop_restaurant_index_sql;
EXECUTE drop_restaurant_index_stmt;
DEALLOCATE PREPARE drop_restaurant_index_stmt;

SET @drop_like_count_sql := (
    SELECT IF(EXISTS (
                      SELECT 1
                      FROM INFORMATION_SCHEMA.COLUMNS
                      WHERE TABLE_SCHEMA = DATABASE()
                        AND TABLE_NAME = 'restaurant'
                        AND COLUMN_NAME = 'like_count'
                  ),
                  'ALTER TABLE `restaurant` DROP COLUMN `like_count`',
                  'SELECT 1')
);

PREPARE drop_like_count_stmt FROM @drop_like_count_sql;
EXECUTE drop_like_count_stmt;
DEALLOCATE PREPARE drop_like_count_stmt;

SET @drop_type_sql := (
    SELECT IF(EXISTS (
                      SELECT 1
                      FROM INFORMATION_SCHEMA.COLUMNS
                      WHERE TABLE_SCHEMA = DATABASE()
                        AND TABLE_NAME = 'restaurant'
                        AND COLUMN_NAME = 'type'
                  ),
                  'ALTER TABLE `restaurant` DROP COLUMN `type`',
                  'SELECT 1')
);

PREPARE drop_type_stmt FROM @drop_type_sql;
EXECUTE drop_type_stmt;
DEALLOCATE PREPARE drop_type_stmt;

SET @restaurant_index_exists = (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'restaurant'
      AND INDEX_NAME = 'idx_restaurant_pickeat_id'
);

SET @create_restaurant_index_sql = IF(@restaurant_index_exists = 0,
                                      'CREATE INDEX `idx_restaurant_pickeat_id` ON `restaurant` (`pickeat_id`)',
                                      'SELECT 1');

PREPARE create_restaurant_index_stmt FROM @create_restaurant_index_sql;
EXECUTE create_restaurant_index_stmt;
DEALLOCATE PREPARE create_restaurant_index_stmt;
