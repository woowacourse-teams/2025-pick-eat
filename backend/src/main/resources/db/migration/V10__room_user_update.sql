UPDATE room_user ru
    JOIN (
    SELECT room_id, user_id, MIN(id) AS keep_id
    FROM room_user
    WHERE deleted = b'0'
    GROUP BY room_id, user_id
    HAVING COUNT(*) > 1
    ) k
ON ru.room_id = k.room_id AND ru.user_id = k.user_id
    SET ru.deleted = b'1'
WHERE ru.id <> k.keep_id
  AND ru.deleted = b'0';


SET @schema = DATABASE();
SET SESSION group_concat_max_len = 1000000;

CREATE TEMPORARY TABLE IF NOT EXISTS tmp_fk_names (name VARCHAR(64)) ENGINE=Memory;
TRUNCATE TABLE tmp_fk_names;

INSERT INTO tmp_fk_names(name)
SELECT tc.CONSTRAINT_NAME
FROM information_schema.TABLE_CONSTRAINTS tc
WHERE tc.CONSTRAINT_SCHEMA = @schema
  AND tc.TABLE_NAME = 'room_user'
  AND tc.CONSTRAINT_TYPE = 'FOREIGN KEY';

SET @drop_fk_sql = (
  SELECT CONCAT(
           'ALTER TABLE `room_user` ',
           GROUP_CONCAT(CONCAT('DROP FOREIGN KEY `', name, '`') SEPARATOR ', '),
           ';'
         )
  FROM tmp_fk_names
);
SET @drop_fk_sql = IF(@drop_fk_sql IS NULL OR @drop_fk_sql = '', 'SELECT 1;', @drop_fk_sql);
PREPARE stmt FROM @drop_fk_sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @drop_idx_sql = (
  SELECT CONCAT(
           'ALTER TABLE `room_user` ',
           GROUP_CONCAT(CONCAT('DROP INDEX `', s.INDEX_NAME, '`') SEPARATOR ', '),
           ';'
         )
  FROM information_schema.STATISTICS s
  WHERE s.TABLE_SCHEMA = @schema
    AND s.TABLE_NAME   = 'room_user'
    AND s.INDEX_NAME IN (SELECT name FROM tmp_fk_names)
);
SET @drop_idx_sql = IF(@drop_idx_sql IS NULL OR @drop_idx_sql = '', 'SELECT 1;', @drop_idx_sql);
PREPARE stmt2 FROM @drop_idx_sql; EXECUTE stmt2; DEALLOCATE PREPARE stmt2;

DROP TEMPORARY TABLE IF EXISTS tmp_fk_names;

CREATE INDEX idx_room_user_room_deleted ON room_user (room_id, deleted);
CREATE INDEX idx_room_user_user_deleted ON room_user (user_id, deleted);
