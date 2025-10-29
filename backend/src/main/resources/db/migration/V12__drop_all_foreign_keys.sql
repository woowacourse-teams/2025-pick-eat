-- ------------------------------
-- Drop all FOREIGN KEYS in schema (MySQL 9++, Flyway-safe)
-- ------------------------------
DELIMITER $$

DROP PROCEDURE IF EXISTS drop_all_foreign_keys $$
CREATE PROCEDURE drop_all_foreign_keys()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_table_name VARCHAR(255);
    DECLARE v_constraint_name VARCHAR(255);
    DECLARE drop_sql TEXT;

    -- 커서 선언 시 DATABASE() 함수 직접 사용
    DECLARE fk_cursor CURSOR FOR
SELECT TABLE_NAME, CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE CONSTRAINT_TYPE = 'FOREIGN KEY'
  AND TABLE_SCHEMA = DATABASE();

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

OPEN fk_cursor;

read_loop: LOOP
        FETCH fk_cursor INTO v_table_name, v_constraint_name;
        IF done THEN
            LEAVE read_loop;
END IF;

        -- 동적 SQL 생성 및 실행
        SET drop_sql = CONCAT('ALTER TABLE `', v_table_name,
                              '` DROP FOREIGN KEY `', v_constraint_name, '`');

        SET @s = drop_sql;
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
END LOOP;

CLOSE fk_cursor;
END $$

DELIMITER ;

-- 프로시저 실행
CALL drop_all_foreign_keys();
DROP PROCEDURE drop_all_foreign_keys;
