-- 인덱스 생성 (논블로킹)

CREATE INDEX idx_pickeat_room_id ON pickeat (room_id) ALGORITHM = INPLACE LOCK = NONE;

CREATE INDEX idx_deleted_updated ON pickeat (deleted, updated_at) ALGORITHM = INPLACE LOCK = NONE;

CREATE INDEX idx_wish_list_roomid_is_template ON wish_list (is_template) ALGORITHM = INPLACE LOCK = NONE;

CREATE INDEX idx_wish_list_room_id ON wish_list (room_id) ALGORITHM = INPLACE LOCK = NONE;

-- UNIQUE 제약조건  추가

ALTER TABLE users
    ADD CONSTRAINT user_provider UNIQUE (provider_id, provider);
