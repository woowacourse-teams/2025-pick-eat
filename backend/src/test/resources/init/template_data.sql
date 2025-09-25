-- 운영자 유저 생성
INSERT INTO users (nickname, provider_id, provider, created_at, updated_at, deleted)
VALUES ('운영자', 1, 'SERVER', NOW(), NOW(), false);

-- 잠실 Room 데이터
INSERT INTO room (name, created_at, updated_at, deleted)
VALUES ('운영자 잠실 Room', NOW(), NOW(), false);

-- RoomUser 연결 데이터
INSERT INTO room_user (room_id, user_id, created_at, updated_at, deleted)
VALUES (1, 1, NOW(), NOW(), false);

-- 잠실 WishList 데이터
INSERT INTO wish_list (name, room_id, is_template, created_at, updated_at, deleted)
VALUES ('잠실', 1, true, NOW(), NOW(), false);

-- 잠실 Wish 데이터
INSERT INTO wish (name, food_category, road_address_name, tags, place_url, wish_list_id, created_at, updated_at, deleted) VALUES
('서해바지락칼국수', 'KOREAN', '서울 송파구 올림픽로35가길 11 한신코아오피스텔 1층 112호', '칼국수, 만두, 파전', 'https://place.map.kakao.com/505348601', 1, NOW(), NOW(), false),
('육회바른연어', 'JAPANESE', '서울 송파구 올림픽로35가길 11 한신코어오피스텔 1층 103호', '연어, 육회, 덮밥, 초밥', 'https://place.map.kakao.com/505348601', 1, NOW(), NOW(), false),
('연어식당', 'JAPANESE', '서울 송파구 올림픽로35가길 9 잠실푸르지오월드마크 1층', '연어, 덮밥', 'https://place.map.kakao.com/505348601', 1, NOW(), NOW(), false),
('성화마라탕', 'CHINESE', '서울 송파구 올림픽로35가길 9 지하1층 39,40호', '마라탕, 마라샹궈, 꿔바로우', 'https://place.map.kakao.com/505348601', 1, NOW(), NOW(), false),
('맥도날드', 'OTHERS', '서울 송파구 송파대로 558 월드타워빌딩 1층', '햄버거', 'https://place.map.kakao.com/505348601', 1, NOW(), NOW(), false),
('홍수계찜닭', 'KOREAN', '서울 송파구 송파대로 570 타워730 지하1층', '찜닭', 'https://place.map.kakao.com/505348601', 1, NOW(), NOW(), false);

-- 잠실 WishPicture 데이터 (서브쿼리 사용)
INSERT INTO wish_picture (wish_id, picture_key, download_url, created_at, updated_at, deleted)
SELECT w.id, 'pickeat/wish_images/default_images/jamsil_template/서해바지락 칼국수.png',
       'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EC%84%9C%ED%95%B4%EB%B0%94%EC%A7%80%EB%9D%BD+%EC%B9%BC%EA%B5%AD%EC%88%98.png',
       NOW(), NOW(), false
FROM wish w WHERE w.name = '서해바지락칼국수';

INSERT INTO wish_picture (wish_id, picture_key, download_url, created_at, updated_at, deleted)
SELECT w.id, 'pickeat/wish_images/default_images/jamsil_template/육회바른연어.jpg',
       'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EC%9C%A1%ED%9A%8C%EB%B0%94%EB%A5%B8%EC%97%B0%EC%96%B4.jpg',
       NOW(), NOW(), false
FROM wish w WHERE w.name = '육회바른연어';

INSERT INTO wish_picture (wish_id, picture_key, download_url, created_at, updated_at, deleted)
SELECT w.id, 'pickeat/wish_images/default_images/jamsil_template/연어식당.jpg',
       'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EC%97%B0%EC%96%B4%EC%8B%9D%EB%8B%B9.jpg',
       NOW(), NOW(), false
FROM wish w WHERE w.name = '연어식당';

INSERT INTO wish_picture (wish_id, picture_key, download_url, created_at, updated_at, deleted)
SELECT w.id, 'pickeat/wish_images/default_images/jamsil_template/성화마라탕.jpg',
       'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EC%84%B1%ED%99%94%EB%A7%88%EB%9D%BC%ED%83%95.jpg',
       NOW(), NOW(), false
FROM wish w WHERE w.name = '성화마라탕';

INSERT INTO wish_picture (wish_id, picture_key, download_url, created_at, updated_at, deleted)
SELECT w.id, 'pickeat/wish_images/default_images/jamsil_template/맥도날드.jpg',
       'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%EB%A7%A5%EB%8F%84%EB%82%A0%EB%93%9C.jpg',
       NOW(), NOW(), false
FROM wish w WHERE w.name = '맥도날드';

INSERT INTO wish_picture (wish_id, picture_key, download_url, created_at, updated_at, deleted)
SELECT w.id, 'pickeat/wish_images/default_images/jamsil_template/홍수계찜닭.jpg',
       'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/default_images/jamsil_template/%ED%99%8D%EC%88%98%EA%B3%84%EC%B0%9C%EB%8B%AD.jpg',
       NOW(), NOW(), false
FROM wish w WHERE w.name = '홍수계찜닭';
