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
