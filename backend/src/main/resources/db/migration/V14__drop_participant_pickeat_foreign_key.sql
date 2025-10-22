ALTER TABLE `participant`
    DROP FOREIGN KEY `FKt0fy0xdd97i4u9om07urapp6g`;

SET @participant_fk_index := 'FKt0fy0xdd97i4u9om07urapp6g';
SET @drop_participant_index_sql := (
    SELECT IF(EXISTS (
                      SELECT 1
                      FROM INFORMATION_SCHEMA.STATISTICS
                      WHERE TABLE_SCHEMA = DATABASE()
                        AND TABLE_NAME = 'participant'
                        AND INDEX_NAME = @participant_fk_index
                  ),
                  CONCAT('ALTER TABLE `participant` DROP INDEX `', @participant_fk_index, '`'),
                  'SELECT 1')
);

PREPARE drop_participant_index_stmt FROM @drop_participant_index_sql;
EXECUTE drop_participant_index_stmt;
DEALLOCATE PREPARE drop_participant_index_stmt;

SET @participant_index_exists = (
    SELECT COUNT(*)
    FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'participant'
      AND INDEX_NAME = 'idx_participant_pickeat_id'
);

SET @create_participant_index_sql = IF(@participant_index_exists = 0,
                                       'CREATE INDEX `idx_participant_pickeat_id` ON `participant` (`pickeat_id`)',
                                       'SELECT 1');

PREPARE create_participant_index_stmt FROM @create_participant_index_sql;
EXECUTE create_participant_index_stmt;
DEALLOCATE PREPARE create_participant_index_stmt;
