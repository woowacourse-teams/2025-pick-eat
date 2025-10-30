-- -------------------------------
-- Restaurant 테이블의 FoodCategory 필드를 Varchar 타입으로 변경
-- -------------------------------
ALTER TABLE `restaurant`
CHANGE COLUMN `food_category` `old_food_category`
ENUM('CHINESE','JAPANESE','KOREAN','OTHERS','WESTERN') NOT NULL;

ALTER TABLE `restaurant`
ADD COLUMN `food_category` VARCHAR(30) NULL AFTER `old_food_category`;

UPDATE `restaurant`
SET `food_category` = `old_food_category`;

ALTER TABLE `restaurant`
MODIFY COLUMN `food_category` VARCHAR(30) NOT NULL;

ALTER TABLE `restaurant`
DROP COLUMN `old_food_category`;

-- -------------------------------
-- Wish 테이블의 FoodCategory 필드를 Varchar 타입으로 변경
-- -------------------------------
ALTER TABLE `wish`
CHANGE COLUMN `food_category` `old_food_category`
ENUM('CHINESE','JAPANESE','KOREAN','OTHERS','WESTERN') NOT NULL;

ALTER TABLE `wish`
ADD COLUMN `food_category` VARCHAR(20) NULL AFTER `old_food_category`;

UPDATE `wish`
SET `food_category` = `old_food_category`;

ALTER TABLE `wish`
MODIFY COLUMN `food_category` VARCHAR(20) NOT NULL;

ALTER TABLE `wish`
DROP COLUMN `old_food_category`;

-- -------------------------------
-- TemplateWish 테이블의 FoodCategory 필드를 Varchar 타입으로 변경
-- -------------------------------
ALTER TABLE `template_wish`
CHANGE COLUMN `food_category` `old_food_category`
ENUM('CHINESE','JAPANESE','KOREAN','OTHERS','WESTERN') NOT NULL;

ALTER TABLE `template_wish`
ADD COLUMN `food_category` VARCHAR(20) NULL AFTER `old_food_category`;

UPDATE `template_wish`
SET `food_category` = `old_food_category`;

ALTER TABLE `template_wish`
MODIFY COLUMN `food_category` VARCHAR(20) NOT NULL;

ALTER TABLE `template_wish`
DROP COLUMN `old_food_category`;
