-- Phase 1: 새 컬럼 추가 및 데이터 동기화 준비
-- =====================================

-- 1-1. participant 테이블에 새 컬럼 추가 (기존 컬럼 유지)
ALTER TABLE `participant`
    ADD COLUMN `is_completed` bit(1) NOT NULL DEFAULT 0 COMMENT 'New column for is_elimination_completed';

-- 1-2. 기존 데이터를 새 컬럼으로 복사
UPDATE `participant`
SET `is_completed` = `is_elimination_completed`;

-- 1-3. 새 컬럼을 NOT NULL로 변경
ALTER TABLE `participant`
    MODIFY COLUMN `is_completed` bit(1) NOT NULL;

-- 1-4. wish_list 테이블에 새 컬럼 추가 (기존 컬럼 유지)  
ALTER TABLE `wish_list`
    ADD COLUMN `is_template` bit(1) NOT NULL DEFAULT 0 COMMENT 'New column for is_public';

-- 1-5. 기존 데이터를 새 컬럼으로 복사
UPDATE `wish_list`
SET `is_template` = `is_public`;

-- 1-6. 새 컬럼을 NOT NULL로 변경
ALTER TABLE `wish_list`
    MODIFY COLUMN `is_template` bit(1) NOT NULL;

-- 1-7. wish 테이블에 place_url 컬럼 추가
ALTER TABLE `wish`
    ADD COLUMN `place_url` varchar(255) DEFAULT NULL;

-- =====================================
-- Phase 2: 데이터 동기화 트리거 생성
-- =====================================

-- 2-1. participant 테이블 양방향 동기화 트리거
DELIMITER $$

-- is_elimination_completed 변경 시 is_completed 동기화
CREATE TRIGGER `tr_participant_sync_to_new`
    BEFORE UPDATE
    ON `participant`
    FOR EACH ROW
BEGIN
    -- is_elimination_completed가 변경되면 is_completed도 동기화
    IF OLD.is_elimination_completed != NEW.is_elimination_completed THEN
        SET NEW.is_completed = NEW.is_elimination_completed;
    END IF;
END$$

-- is_completed 변경 시 is_elimination_completed 동기화 (신규 코드 대비)
CREATE TRIGGER `tr_participant_sync_to_old`
    BEFORE UPDATE
    ON `participant`
    FOR EACH ROW
BEGIN
    -- is_completed가 변경되면 is_elimination_completed도 동기화
    IF OLD.is_completed != NEW.is_completed THEN
        SET NEW.is_elimination_completed = NEW.is_completed;
    END IF;
END$$

DELIMITER ;

-- 2-2. wish_list는 생성 후 변경되지 않으므로 트리거 불필요

