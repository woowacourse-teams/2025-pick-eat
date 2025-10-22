UPDATE room_user ru
    JOIN (
    SELECT room_id, user_id, MIN(id) AS keep_id
    FROM room_user
    WHERE deleted = b'0'
    GROUP BY room_id, user_id
    HAVING COUNT(*) > 1
    ) k
ON ru.room_id = k.room_id AND ru.user_id = k.user_id
    SET ru.deleted = b'1'
WHERE ru.id <> k.keep_id AND ru.deleted = b'0';

ALTER TABLE room_user
DROP FOREIGN KEY `FKaqm4k7a8o6lq80j3l1rls58ux`,
  DROP FOREIGN KEY `FKtakjqllocgakgw0os4hygxfk1`;

ALTER TABLE room_user
DROP INDEX `FKaqm4k7a8o6lq80j3l1rls58ux`,
DROP INDEX `FKtakjqllocgakgw0os4hygxfk1`;

ALTER TABLE room_user
    ADD UNIQUE KEY `uq_room_user_roomid_userid_deleted` (room_id, user_id, deleted);

ALTER TABLE room_user
    ADD INDEX `idx_room_user_room_deleted` (room_id, deleted),
  ADD INDEX `idx_room_user_user_deleted` (user_id, deleted);
