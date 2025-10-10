-- -------------------------------
-- wish 버전2 테이블 생성
-- -------------------------------
CREATE TABLE `wish_v2` (
  `deleted` bit(1) NOT NULL COMMENT 'Soft-delete indicator',
  `distance` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `room_id` bigint NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `picture_key` varchar(255) DEFAULT NULL,
  `picture_url` varchar(255) DEFAULT NULL,
  `place_url` varchar(255) DEFAULT NULL,
  `road_address_name` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `food_category` enum('CHINESE','JAPANESE','KOREAN','OTHERS','WESTERN') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl9er9ug7irskm894yopy11wdu` (`room_id`),
  CONSTRAINT `FKl9er9ug7irskm894yopy11wdu` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -------------------------------
-- 초기 데이터 이동 : wish -> wish_v2
-- -------------------------------
INSERT INTO wish_v2 (
    id,
    room_id,
    name,
    food_category,
    road_address_name,
    distance,
    place_url,
    tags,
    created_at,
    updated_at,
    deleted
)
SELECT
    w.id,
    wl.room_id,
    w.name,
    w.food_category,
    w.road_address_name,
    NULL AS distance,
    w.place_url,
    w.tags,
    w.created_at,
    w.updated_at,
    w.deleted
FROM wish w
INNER JOIN wish_list wl ON w.wish_list_id = wl.id;

-- -------------------------------
-- 초기 데이터 이동 : wish_picture -> wish_v2
-- -------------------------------
UPDATE wish_v2 v
INNER JOIN (
    SELECT wp1.wish_id, wp1.picture_key, wp1.download_url
    FROM wish_picture wp1
    INNER JOIN (
        SELECT wish_id, MIN(id) AS min_id
        FROM wish_picture
        GROUP BY wish_id
    ) wp2 ON wp1.wish_id = wp2.wish_id AND wp1.id = wp2.min_id
) wp ON v.id = wp.wish_id
SET
    v.picture_key = wp.picture_key,
    v.picture_url = wp.download_url;

-- -------------------------------
-- 트리거 : wish → wish_v2
-- -------------------------------
DELIMITER $$
CREATE TRIGGER trg_wish_to_wish_v2
AFTER INSERT ON wish
FOR EACH ROW
BEGIN
    INSERT INTO wish_v2 (
        id,
        room_id,
        name,
        food_category,
        road_address_name,
        distance,
        place_url,
        tags,
        created_at,
        updated_at,
        deleted
    )
    SELECT
        NEW.id,
        wl.room_id,
        NEW.name,
        NEW.food_category,
        NEW.road_address_name,
        NULL,
        NEW.place_url,
        NEW.tags,
        NEW.created_at,
        NEW.updated_at,
        NEW.deleted
    FROM wish_list wl
    WHERE wl.id = NEW.wish_list_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_wish_update_to_wish_v2
AFTER UPDATE ON wish
FOR EACH ROW
BEGIN
    UPDATE wish_v2
    SET
        name = NEW.name,
        food_category = NEW.food_category,
        road_address_name = NEW.road_address_name,
        tags = NEW.tags,
        place_url = NEW.place_url,
        deleted = NEW.deleted,
        updated_at = NEW.updated_at
    WHERE id = NEW.id;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_wish_delete_to_wish_v2
AFTER UPDATE ON wish
FOR EACH ROW
BEGIN
    UPDATE wish_v2
    SET deleted = b'1'
    WHERE id = NEW.id;
END$$
DELIMITER ;

-- -------------------------------
-- 트리거 : wish_picture → wish_v2
-- -------------------------------
DELIMITER $$
CREATE TRIGGER trg_wish_picture_insert_to_wish_v2
AFTER INSERT ON wish_picture
FOR EACH ROW
BEGIN
    UPDATE wish_v2
    SET picture_key = NEW.picture_key,
        picture_url = NEW.download_url
    WHERE id = NEW.wish_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_wish_picture_update_delete_to_wish_v2
AFTER UPDATE ON wish_picture
FOR EACH ROW
BEGIN
    IF (OLD.deleted = 0 AND NEW.deleted = 1) THEN
        UPDATE wish_v2
        SET picture_key = NULL,
            picture_url = NULL
        WHERE id = NEW.wish_id;

    ELSEIF (NEW.deleted = 0) THEN
        UPDATE wish_v2
        SET picture_key = NEW.picture_key,
            picture_url = NEW.download_url
        WHERE id = NEW.wish_id;
    END IF;
END$$
DELIMITER ;
