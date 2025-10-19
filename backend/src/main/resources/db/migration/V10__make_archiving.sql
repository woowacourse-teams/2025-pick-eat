-- -------------------------------
-- 아카이브 테이블 생성
-- -------------------------------
CREATE TABLE archive_users (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    original_id BIGINT NOT NULL,
    archived_data JSON NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    source_table VARCHAR(255) NOT NULL,
    archived_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    flyway_version VARCHAR(50) NOT NULL,
    data_hash CHAR(64) NOT NULL,
    INDEX idx_original_id (original_id),
    INDEX idx_archived_at (archived_at)
);

CREATE TABLE archive_room LIKE archive_users;
CREATE TABLE archive_room_user LIKE archive_users;
CREATE TABLE archive_template LIKE archive_users;
CREATE TABLE archive_template_wish LIKE archive_users;
CREATE TABLE archive_wish LIKE archive_users;

-- -------------------------------
-- 테이블의 데이터를 아카이브 테이블로 옮기는 프로시저 생성
-- -------------------------------

DELIMITER $$

CREATE PROCEDURE archive_table(
    IN tbl_name VARCHAR(64),
    IN archive_tbl_name VARCHAR(64)
)
BEGIN
    DECLARE cols_text TEXT;
    DECLARE hash_text TEXT;
    DECLARE sql_text TEXT;
    DECLARE latest_version VARCHAR(50);

    -- -------------------------------
    -- 최신 Flyway 버전 조회
    -- -------------------------------
    SELECT version
    INTO latest_version
    FROM flyway_schema_history
    WHERE success = 1
    ORDER BY installed_rank DESC
    LIMIT 1;

    -- -------------------------------
    -- 컬럼, 해시 문자열 생성
    -- -------------------------------
    SELECT GROUP_CONCAT(CONCAT("'", COLUMN_NAME, "', ", COLUMN_NAME) SEPARATOR ", ")
    INTO cols_text
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = tbl_name
      AND COLUMN_NAME NOT IN ('deleted');

    SELECT GROUP_CONCAT(CONCAT("COALESCE(CAST(", COLUMN_NAME, " AS CHAR), '')") SEPARATOR ", ")
    INTO hash_text
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = tbl_name
      AND COLUMN_NAME NOT IN ('deleted');

    -- -------------------------------
    -- 아카이브 INSERT 문 생성 및 실행
    -- -------------------------------
    SET sql_text = CONCAT(
        "INSERT INTO ", archive_tbl_name,
        " (original_id, archived_data, created_at, updated_at, source_table, archived_at, flyway_version, data_hash) ",
        "SELECT id, JSON_OBJECT(", cols_text, "), created_at, updated_at, '", tbl_name,
        "', NOW(), '", latest_version, "', SHA2(CONCAT(", hash_text, "), 256) ",
        "FROM ", tbl_name, " WHERE deleted = 1"
    );

    SET @sql_text = sql_text;
    PREPARE stmt FROM @sql_text;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    -- -------------------------------
    -- 원본 테이블에서 삭제
    -- -------------------------------
    SET @del_sql = CONCAT("DELETE FROM ", tbl_name, " WHERE deleted = 1");
    PREPARE del_stmt FROM @del_sql;
    EXECUTE del_stmt;
    DEALLOCATE PREPARE del_stmt;
END$$

DELIMITER ;

-- -------------------------------
-- 매일 새벽 2시에 아카이빙 작업을 수행하는 스케줄러 생성
-- -------------------------------
SET @OLD_TIME_ZONE = @@session.time_zone;
SET SESSION time_zone = '+00:00';

DELIMITER $$
CREATE EVENT archive_all_daily
ON SCHEDULE EVERY 1 DAY
STARTS '2025-10-17 17:00:00'
DO
BEGIN
    CALL archive_table('template_wish', 'archive_template_wish');
    CALL archive_table('wish_v2', 'archive_wish');
    CALL archive_table('room_user', 'archive_room_user');
    CALL archive_table('room', 'archive_room');
    CALL archive_table('users', 'archive_users');
    CALL archive_table('template', 'archive_template');
END$$
DELIMITER ;

SET SESSION time_zone = @OLD_TIME_ZONE;
