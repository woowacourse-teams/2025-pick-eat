-- ------------------------------
-- Drop all indexes except PRIMARY KEY
-- ------------------------------
DELIMITER $$

DROP PROCEDURE IF EXISTS drop_all_indexes_except_pk $$
CREATE PROCEDURE drop_all_indexes_except_pk()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_table_name VARCHAR(255);
    DECLARE v_index_name VARCHAR(255);
    DECLARE drop_sql TEXT;

    -- PK가 아닌 모든 인덱스 조회 커서
    DECLARE idx_cursor CURSOR FOR
SELECT
    TABLE_NAME,
    INDEX_NAME
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = DATABASE()
  AND INDEX_NAME != 'PRIMARY'
GROUP BY TABLE_NAME, INDEX_NAME;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

OPEN idx_cursor;

read_loop: LOOP
        FETCH idx_cursor INTO v_table_name, v_index_name;
        IF done THEN
            LEAVE read_loop;
END IF;

        -- 인덱스 삭제
        SET drop_sql = CONCAT('ALTER TABLE `', v_table_name,
                              '` DROP INDEX `', v_index_name, '`');

        SET @s = drop_sql;
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
END LOOP;

CLOSE idx_cursor;
END $$

DELIMITER ;

-- 프로시저 실행
CALL drop_all_indexes_except_pk();
DROP PROCEDURE drop_all_indexes_except_pk;
