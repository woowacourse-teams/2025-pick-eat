CREATE INDEX idx_participant_pickeat_id
    ON participant (pickeat_id);

ALTER TABLE pickeat
ADD CONSTRAINT uk_pickeat_code UNIQUE (code);

CREATE INDEX idx_pickeat_deleted_updated_at
ON pickeat (deleted, updated_at);

CREATE INDEX idx_pickeat_room_id
ON pickeat (room_id);

ALTER TABLE pickeat_result
ADD CONSTRAINT uk_pickeat_result_pickeat_id UNIQUE (pickeat_id),
ADD CONSTRAINT uk_pickeat_result_restaurant_id UNIQUE (restaurant_id);

CREATE INDEX idx_restaurant_pickeat_id
ON restaurant (pickeat_id);

CREATE INDEX idx_restaurant_like_participant_id
ON restaurant_like (participant_id);

CREATE INDEX idx_restaurant_like_restaurant_id
ON restaurant_like (restaurant_id);

CREATE INDEX idx_room_user_room_id_deleted
ON room_user (room_id, deleted);

CREATE INDEX idx_room_user_user_id_deleted
ON room_user (user_id, deleted);

CREATE INDEX idx_template_wish_template_id
ON template_wish (template_id);

ALTER TABLE users
    ADD CONSTRAINT uk_users_nickname UNIQUE (nickname);

CREATE INDEX idx_users_provider_id_provider
    ON users (provider_id, provider);

CREATE INDEX idx_wish_room_id
ON wish (room_id);
