-- 1. 중복 데이터 정리 (DML)
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

-- 2. Foreign Key (FK) 이름 수집
CREATE TEMPORARY TABLE IF NOT EXISTS tmp_fk_names (name VARCHAR(64)) ENGINE=Memory;
TRUNCATE TABLE tmp_fk_names;

INSERT INTO tmp_fk_names(name)
SELECT tc.CONSTRAINT_NAME
FROM information_schema.TABLE_CONSTRAINTS tc
WHERE tc.CONSTRAINT_SCHEMA = @schema
  AND tc.TABLE_NAME = 'room_user'
  AND tc.CONSTRAINT_TYPE = 'FOREIGN KEY';

-- 3. FK 동적 삭제 (FK가 없으면 'SELECT 1;'이 실행되므로 안전)
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

-- 4. FK와 연결된 인덱스 동적 삭제 (인덱스가 없으면 'SELECT 1;'이 실행되므로 안전)
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

-- 5. 새로운 인덱스 생성 (동적 SQL로 DROP INDEX IF EXISTS 기능 구현)

-- 5-1. 인덱스 1: idx_room_user_room_deleted 처리
SET @drop_idx1_sql = NULL;
SELECT CONCAT('DROP INDEX `', s.INDEX_NAME, '` ON `room_user`;') INTO @drop_idx1_sql
FROM information_schema.STATISTICS s
WHERE s.TABLE_SCHEMA = @schema
  AND s.TABLE_NAME   = 'room_user'
  AND s.INDEX_NAME   = 'idx_room_user_room_deleted';

SET @drop_idx1_sql = IF(@drop_idx1_sql IS NULL, 'SELECT 1;', @drop_idx1_sql);
PREPARE stmt3 FROM @drop_idx1_sql; EXECUTE stmt3; DEALLOCATE PREPARE stmt3;

CREATE INDEX idx_room_user_room_deleted ON room_user (room_id, deleted);


-- 5-2. 인덱스 2: idx_room_user_user_deleted 처리
SET @drop_idx2_sql = NULL;
SELECT CONCAT('DROP INDEX `', s.INDEX_NAME, '` ON `room_user`;') INTO @drop_idx2_sql
FROM information_schema.STATISTICS s
WHERE s.TABLE_SCHEMA = @schema
  AND s.TABLE_NAME   = 'room_user'
  AND s.INDEX_NAME   = 'idx_room_user_user_deleted';

SET @drop_idx2_sql = IF(@drop_idx2_sql IS NULL, 'SELECT 1;', @drop_idx2_sql);
PREPARE stmt4 FROM @drop_idx2_sql; EXECUTE stmt4; DEALLOCATE PREPARE stmt4;

CREATE INDEX idx_room_user_user_deleted ON room_user (user_id, deleted);
