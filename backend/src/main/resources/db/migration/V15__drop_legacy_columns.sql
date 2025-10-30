-- V15__drop_legacy_columns.sql
SET @schema = DATABASE();

-- 1) restaurant: type, type_old, x, y, picture_urls
SELECT
    CASE
        WHEN drops IS NULL OR drops = '' THEN 'SELECT 1'
        ELSE CONCAT('ALTER TABLE `restaurant` ', drops)
        END
INTO @sql_restaurant
FROM (
         SELECT GROUP_CONCAT(CONCAT('DROP COLUMN `', COLUMN_NAME, '`') SEPARATOR ', ') AS drops
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = @schema
           AND TABLE_NAME   = 'restaurant'
           AND COLUMN_NAME IN ('type','type_old','x','y','picture_urls')
     ) AS t;

PREPARE s1 FROM @sql_restaurant; EXECUTE s1; DEALLOCATE PREPARE s1;

-- 2) pickeat_result: has_equal_like
SELECT
    CASE
        WHEN drops IS NULL OR drops = '' THEN 'SELECT 1'
        ELSE CONCAT('ALTER TABLE `pickeat_result` ', drops)
        END
INTO @sql_pickeat_result
FROM (
         SELECT GROUP_CONCAT(CONCAT('DROP COLUMN `', COLUMN_NAME, '`') SEPARATOR ', ') AS drops
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = @schema
           AND TABLE_NAME   = 'pickeat_result'
           AND COLUMN_NAME IN ('has_equal_like')
     ) AS t2;

PREPARE s2 FROM @sql_pickeat_result; EXECUTE s2; DEALLOCATE PREPARE s2;

-- 3) pickeat: participant_count
SELECT
    CASE
        WHEN drops IS NULL OR drops = '' THEN 'SELECT 1'
        ELSE CONCAT('ALTER TABLE `pickeat` ', drops)
        END
INTO @sql_pickeat
FROM (
         SELECT GROUP_CONCAT(CONCAT('DROP COLUMN `', COLUMN_NAME, '`') SEPARATOR ', ') AS drops
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = @schema
           AND TABLE_NAME   = 'pickeat'
           AND COLUMN_NAME IN ('participant_count')
     ) AS t3;

PREPARE s3 FROM @sql_pickeat; EXECUTE s3; DEALLOCATE PREPARE s3;

-- 4) participant: is_elimination_completed
SELECT
    CASE
        WHEN drops IS NULL OR drops = '' THEN 'SELECT 1'
        ELSE CONCAT('ALTER TABLE `participant` ', drops)
        END
INTO @sql_participant
FROM (
         SELECT GROUP_CONCAT(CONCAT('DROP COLUMN `', COLUMN_NAME, '`') SEPARATOR ', ') AS drops
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = @schema
           AND TABLE_NAME   = 'participant'
           AND COLUMN_NAME IN ('is_elimination_completed')
     ) AS t4;

PREPARE s4 FROM @sql_participant; EXECUTE s4; DEALLOCATE PREPARE s4;
