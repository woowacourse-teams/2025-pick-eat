-- ------------------------------
-- Drop all FOREIGN KEYS and UNIQUE CONSTRAINTS in current schema
-- ------------------------------
DELIMITER $$

DROP PROCEDURE IF EXISTS drop_all_constraints $$
CREATE PROCEDURE drop_all_constraints()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_table_name VARCHAR(255);
    DECLARE v_constraint_name VARCHAR(255);
    DECLARE v_constraint_type VARCHAR(20);
    DECLARE drop_sql TEXT;

    -- 모든 외래키와 유니크 제약조건을 커서로 탐색
    DECLARE fk_cursor CURSOR FOR
SELECT TABLE_NAME, CONSTRAINT_NAME, CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = DATABASE()
  AND CONSTRAINT_TYPE IN ('FOREIGN KEY', 'UNIQUE');

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

OPEN fk_cursor;

read_loop: LOOP
        FETCH fk_cursor INTO v_table_name, v_constraint_name, v_constraint_type;
        IF done THEN
            LEAVE read_loop;
END IF;

        IF v_constraint_type = 'FOREIGN KEY' THEN
            SET drop_sql = CONCAT('ALTER TABLE `', v_table_name,
                                  '` DROP FOREIGN KEY `', v_constraint_name, '`');
        ELSEIF v_constraint_type = 'UNIQUE' THEN
            SET drop_sql = CONCAT('ALTER TABLE `', v_table_name,
                                  '` DROP INDEX `', v_constraint_name, '`');
END IF;

        SET @s = drop_sql;
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
END LOOP;

CLOSE fk_cursor;
END $$
DELIMITER ;

-- 프로시저 실행
CALL drop_all_constraints();
DROP PROCEDURE drop_all_constraints;
