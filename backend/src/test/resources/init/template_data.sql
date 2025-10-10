-- 템플릿 데이터
INSERT INTO template (id, name, created_at, updated_at, deleted)
VALUES
(1, '데이트 추천 맛집', NOW(), NOW(), FALSE),
(2, '점심 회식 추천', NOW(), NOW(), FALSE);

-- 템플릿 1번의 위시 5개
INSERT INTO template_wish (
    template_id, name, food_category, road_address_name, distance, place_url, tags,
    picture_key, picture_url, created_at, updated_at, deleted
) VALUES
(1, '라비타', 'WESTERN', '서울 강남구 테헤란로 25길 10', 250,
 'https://place.map.kakao.com/111111', '분위기좋은,코스요리',
 'lavita-key', 'https://cdn.example.com/lavita.jpg', NOW(), NOW(), FALSE),

(1, '더리버', 'OTHERS', '서울 용산구 이태원로 33', 500,
 'https://place.map.kakao.com/111112', '한강뷰,야경맛집',
 'theriver-key', 'https://cdn.example.com/theriver.jpg', NOW(), NOW(), FALSE),

(1, '비스트로 루', 'WESTERN', '서울 서초구 서래로 15', 300,
 'https://place.map.kakao.com/111113', '프렌치,조용한분위기',
 'bistro-key', 'https://cdn.example.com/bistro.jpg', NOW(), NOW(), FALSE),

(1, '라운지 엘루아', 'OTHERS', '서울 강남구 봉은사로 12', 450,
 'https://place.map.kakao.com/111114', '와인바,분위기좋은',
 'elua-key', 'https://cdn.example.com/elua.jpg', NOW(), NOW(), FALSE),

(1, '루프탑 오리엔트', 'OTHERS', '서울 중구 명동길 23', 600,
 'https://place.map.kakao.com/111115', '루프탑,야경',
 'orient-key', 'https://cdn.example.com/orient.jpg', NOW(), NOW(), FALSE);

-- 템플릿 2번의 위시 5개
INSERT INTO template_wish (
    template_id, name, food_category, road_address_name, distance, place_url, tags,
    picture_key, picture_url, created_at, updated_at, deleted
) VALUES
(2, '삼거리 포차', 'KOREAN', '서울 강남구 논현로 45길 8', 200,
 'https://place.map.kakao.com/222111', '분위기좋은,술집',
 'pocha-key', 'https://cdn.example.com/pocha.jpg', NOW(), NOW(), FALSE),

(2, '부대통령', 'KOREAN', '서울 마포구 양화로 123', 350,
 'https://place.map.kakao.com/222112', '회식추천,매운맛',
 'vicepresident-key', 'https://cdn.example.com/vicepresident.jpg', NOW(), NOW(), FALSE),

(2, '백리향', 'CHINESE', '서울 중구 세종대로 45', 400,
 'https://place.map.kakao.com/222113', '고급중식,단체석',
 'baekrihyang-key', 'https://cdn.example.com/baekrihyang.jpg', NOW(), NOW(), FALSE),

(2, '스시야 마루', 'JAPANESE', '서울 서초구 강남대로 201', 320,
 'https://place.map.kakao.com/222114', '오마카세,점심추천',
 'maru-key', 'https://cdn.example.com/maru.jpg', NOW(), NOW(), FALSE),

(2, '인디언스푼', 'OTHERS', '서울 영등포구 여의대로 88', 600,
 'https://place.map.kakao.com/222115', '이색맛집,커리',
 'indianspoon-key', 'https://cdn.example.com/indianspoon.jpg', NOW(), NOW(), FALSE);
