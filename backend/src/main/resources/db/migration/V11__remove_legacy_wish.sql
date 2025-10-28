-- -------------------------------
-- 레거시 위시 관련 트리거 제거
-- -------------------------------
DROP TRIGGER IF EXISTS trg_wish_to_wish_v2;
DROP TRIGGER IF EXISTS trg_wish_update_to_wish_v2;
DROP TRIGGER IF EXISTS trg_wish_delete_to_wish_v2;
DROP TRIGGER IF EXISTS trg_wish_picture_insert_to_wish_v2;
DROP TRIGGER IF EXISTS trg_wish_picture_update_delete_to_wish_v2;

-- -------------------------------
-- 레거시 위시 테이블 제거
-- -------------------------------
DROP TABLE IF EXISTS wish_picture;
DROP TABLE IF EXISTS wish;
DROP TABLE IF EXISTS wish_list;

-- -------------------------------
-- 기존 wish_v2 테이블의 이름을 wish로 변경
-- -------------------------------
RENAME TABLE wish_v2 TO wish;
