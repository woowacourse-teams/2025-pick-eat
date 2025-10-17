-- -------------------------------
-- 아카이브 테이블 생성
-- -------------------------------
CREATE TABLE users_archive (
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

CREATE TABLE room_archive LIKE users_archive;
ALTER TABLE room_archive
    MODIFY COLUMN source_table VARCHAR(255) NOT NULL;

CREATE TABLE room_user_archive LIKE users_archive;
ALTER TABLE room_user_archive
    MODIFY COLUMN source_table VARCHAR(255) NOT NULL;

CREATE TABLE template_archive LIKE users_archive;
ALTER TABLE template_archive
    MODIFY COLUMN source_table VARCHAR(255) NOT NULL;

CREATE TABLE template_wish_archive LIKE users_archive;
ALTER TABLE template_wish_archive
    MODIFY COLUMN source_table VARCHAR(255) NOT NULL;

CREATE TABLE wish_archive LIKE users_archive;
ALTER TABLE wish_v2_archive
    MODIFY COLUMN source_table VARCHAR(255) NOT NULL;

-- -------------------------------
-- 테이블의 데이터를 아카이브 테이블로 옮기는 프로시저 생성
-- -------------------------------

DELIMITER $$

CREATE PROCEDURE archive_table(IN tbl_name VARCHAR(64), IN archive_tbl_name VARCHAR(64))
BEGIN
    DECLARE cols_text TEXT;
    DECLARE hash_text TEXT;
    DECLARE sql_text TEXT;

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

    SET sql_text = CONCAT(
        "INSERT INTO ", archive_tbl_name, " (original_id, archived_data, created_at, updated_at, source_table, archived_at, flyway_version, data_hash) ",
        "SELECT id, JSON_OBJECT(", cols_text, "), created_at, updated_at, '", tbl_name, "', NOW(), 'V1__initial.sql', SHA2(CONCAT(", hash_text, "), 256) ",
        "FROM ", tbl_name, " WHERE deleted = 1;"
    );

    PREPARE stmt FROM sql_text;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    SET @del_sql = CONCAT("DELETE FROM ", tbl_name, " WHERE deleted = 1;");
    PREPARE del_stmt FROM @del_sql;
    EXECUTE del_stmt;
    DEALLOCATE PREPARE del_stmt;
END$$
DELIMITER ;

-- -------------------------------
-- 매일 새벽 2시에 아카이빙 작업을 수행하는 스케줄러 생성
-- -------------------------------
CREATE EVENT archive_all_daily
ON SCHEDULE EVERY 1 DAY
STARTS '2025-10-18 02:00:00'
DO
BEGIN
    CALL archive_table('users', 'users_archive');
    CALL archive_table('room', 'room_archive');
    CALL archive_table('room_user', 'room_user_archive');
    CALL archive_table('template', 'template_archive');
    CALL archive_table('template_wish', 'template_wish_archive');
    CALL archive_table('wish', 'wish_archive');
END;
