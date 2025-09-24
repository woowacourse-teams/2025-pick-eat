-- Users
INSERT INTO users (created_at, nickname, provider, provider_id, updated_at, deleted)
VALUES (CURRENT_TIMESTAMP, 'user1', 'LOCAL', 1, CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 'user2', 'LOCAL', 2, CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 'user3', 'LOCAL', 3, CURRENT_TIMESTAMP, 0);

-- Room
INSERT INTO room (created_at, name, updated_at, deleted)
VALUES (CURRENT_TIMESTAMP, 'TestRoom', CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 'TestRoom2', CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 'TestRoom3', CURRENT_TIMESTAMP, 0);

-- RoomUser
INSERT INTO room_user (created_at, room_id, updated_at, user_id, deleted)
VALUES (CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 1, 0),
       (CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP, 2, 0),
       (CURRENT_TIMESTAMP, 2, CURRENT_TIMESTAMP, 1, 0),
       (CURRENT_TIMESTAMP, 2, CURRENT_TIMESTAMP, 2, 0),
       (CURRENT_TIMESTAMP, 3, CURRENT_TIMESTAMP, 1, 0);

-- WishList
INSERT INTO wish_list (created_at, is_template, name, room_id, updated_at, deleted)
VALUES (CURRENT_TIMESTAMP, 0, 'TestWishList', 1, CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 1, 'TestWishList', 2, CURRENT_TIMESTAMP, 0);


-- Wish & WishPicture
INSERT INTO wish (created_at, food_category, name, place_url, road_address_name, tags, updated_at, wish_list_id,
                  deleted)
VALUES (CURRENT_TIMESTAMP, 'KOREAN', 'Wish1', NULL, 'Address1', 'tag1', CURRENT_TIMESTAMP, 1, 0),
       (CURRENT_TIMESTAMP, 'CHINESE', 'Wish2', NULL, 'Address2', 'tag2', CURRENT_TIMESTAMP, 1, 0),
       (CURRENT_TIMESTAMP, 'JAPANESE', 'Wish3', NULL, 'Address3', 'tag3', CURRENT_TIMESTAMP, 1, 0),
       (CURRENT_TIMESTAMP, 'WESTERN', 'Wish4', NULL, 'Address4', 'tag4', CURRENT_TIMESTAMP, 1, 0),
       (CURRENT_TIMESTAMP, 'OTHERS', 'Wish5', NULL, 'Address5', 'tag5', CURRENT_TIMESTAMP, 1, 0);

INSERT INTO wish_picture (created_at, download_url, picture_key, updated_at, wish_id, deleted)
VALUES (CURRENT_TIMESTAMP, 'url1', 'key1', CURRENT_TIMESTAMP, 1, 0),
       (CURRENT_TIMESTAMP, 'url2', 'key2', CURRENT_TIMESTAMP, 2, 0),
       (CURRENT_TIMESTAMP, 'url3', 'key3', CURRENT_TIMESTAMP, 3, 0),
       (CURRENT_TIMESTAMP, 'url4', 'key4', CURRENT_TIMESTAMP, 4, 0),
       (CURRENT_TIMESTAMP, 'url5', 'key5', CURRENT_TIMESTAMP, 5, 0),
       (CURRENT_TIMESTAMP, 'url11', 'key1', CURRENT_TIMESTAMP, 1, 0),
       (CURRENT_TIMESTAMP, 'url22', 'key2', CURRENT_TIMESTAMP, 2, 0),
       (CURRENT_TIMESTAMP, 'url33', 'key3', CURRENT_TIMESTAMP, 3, 0),
       (CURRENT_TIMESTAMP, 'url44', 'key4', CURRENT_TIMESTAMP, 4, 0),
       (CURRENT_TIMESTAMP, 'url55', 'key5', CURRENT_TIMESTAMP, 5, 0);

-- Pickeat
INSERT INTO pickeat (created_at, is_active, participant_count, room_id, updated_at, deleted, code, name)
VALUES (CURRENT_TIMESTAMP, 1, 0, NULL, CURRENT_TIMESTAMP, 0,
        UNHEX(REPLACE('123e4567-e89b-12d3-a456-426614174000', '-', '')), 'TestPickeat'),
       (CURRENT_TIMESTAMP, 1, 0, 1, CURRENT_TIMESTAMP, 0,
        UNHEX(REPLACE('123e4567-e89b-12d3-a476-426614174000', '-', '')), 'TestPickeat');

-- Participant
INSERT INTO participant (created_at, is_completed, nickname, pickeat_id, updated_at, deleted)
VALUES (CURRENT_TIMESTAMP, 0, 'David1', 1, CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 0, 'David2', 1, CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 0, 'David3', 1, CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 0, 'David4', 1, CURRENT_TIMESTAMP, 0),
       (CURRENT_TIMESTAMP, 0, 'David5', 1, CURRENT_TIMESTAMP, 0);

-- Restaurant
INSERT INTO restaurant (created_at, is_excluded, like_count, x, y, pickeat_id, updated_at, name, road_address_name,
                        tags, food_category, type, picture_urls, place_url, deleted)
VALUES (CURRENT_TIMESTAMP, 0, 5, 0, 0, 1, CURRENT_TIMESTAMP, 'R1', 'Addr1', 'tag1', 'KOREAN', 'LOCATION', NULL, NULL,
        0),
       (CURRENT_TIMESTAMP, 0, 4, 0, 0, 1, CURRENT_TIMESTAMP, 'R2', 'Addr2', 'tag2', 'CHINESE', 'LOCATION', NULL, NULL,
        0),
       (CURRENT_TIMESTAMP, 0, 3, 0, 0, 1, CURRENT_TIMESTAMP, 'R3', 'Addr3', 'tag3', 'JAPANESE', 'LOCATION', NULL, NULL,
        0),
       (CURRENT_TIMESTAMP, 0, 5, 0, 0, 1, CURRENT_TIMESTAMP, 'R4', 'Addr4', 'tag4', 'WESTERN', 'LOCATION', NULL, NULL,
        0),
       (CURRENT_TIMESTAMP, 0, 2, 0, 0, 1, CURRENT_TIMESTAMP, 'R5', 'Addr5', 'tag5', 'OTHERS', 'LOCATION', NULL, NULL,
        0);

-- PickeatResult
INSERT INTO pickeat_result (created_at, pickeat_id, restaurant_id, updated_at, has_equal_like, deleted)
VALUES (CURRENT_TIMESTAMP, 1, 1, CURRENT_TIMESTAMP, 1, 0);
