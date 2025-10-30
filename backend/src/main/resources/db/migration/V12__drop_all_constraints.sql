DELIMITER $$

DROP PROCEDURE IF EXISTS drop_all_foreign_keys $$
CREATE PROCEDURE drop_all_foreign_keys()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_table_name VARCHAR(255);
    DECLARE v_constraint_name VARCHAR(255);
    DECLARE drop_sql TEXT;

    DECLARE fk_cursor CURSOR FOR
SELECT TABLE_NAME, CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = DATABASE()
  AND CONSTRAINT_TYPE = 'FOREIGN KEY';

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

OPEN fk_cursor;
read_loop: LOOP
        FETCH fk_cursor INTO v_table_name, v_constraint_name;
        IF done THEN
            LEAVE read_loop;
END IF;
        SET drop_sql = CONCAT('ALTER TABLE `', v_table_name, '` DROP FOREIGN KEY `', v_constraint_name, '`');
        SET @s = drop_sql;
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
END LOOP;
CLOSE fk_cursor;
END $$

DROP PROCEDURE IF EXISTS drop_all_uniques $$
CREATE PROCEDURE drop_all_uniques()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE v_table_name VARCHAR(255);
    DECLARE v_constraint_name VARCHAR(255);
    DECLARE drop_sql TEXT;

    DECLARE uq_cursor CURSOR FOR
SELECT TABLE_NAME, CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_SCHEMA = DATABASE()
  AND CONSTRAINT_TYPE = 'UNIQUE';

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

OPEN uq_cursor;
read_loop: LOOP
        FETCH uq_cursor INTO v_table_name, v_constraint_name;
        IF done THEN
            LEAVE read_loop;
END IF;
        SET drop_sql = CONCAT('ALTER TABLE `', v_table_name, '` DROP INDEX `', v_constraint_name, '`');
        SET @s = drop_sql;
PREPARE stmt FROM @s;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
END LOOP;
CLOSE uq_cursor;
END $$

DELIMITER ;

-- 실행 순서 중요!
CALL drop_all_foreign_keys();
CALL drop_all_uniques();
DROP PROCEDURE drop_all_foreign_keys;
DROP PROCEDURE drop_all_uniques;
