--
-- SQLite (Insert master data)
--

--
-- User
--

INSERT INTO users (name, password, email, roles)
VALUES ('Susi', '-test1234', 'susi@test.de', '["admin", "user"]');
INSERT INTO users (name, password, email, roles)
VALUES ('Berti', '-test1234', 'berti@test.de', '["user"]');

--
-- Groups
--
INSERT INTO groups (title, owner_id)
VALUES('Test Block', 1);

--
-- Members
--
INSERT INTO members (group_id, user_id)
VALUES (1, 1);
INSERT INTO members (group_id, user_id)
VALUES (1, 2);

--
-- Notes
--
INSERT INTO notes (group_id, user_id, title, text)
VALUES (1, 2, 'Test Notes', null);
INSERT INTO notes (group_id, user_id, title, text)
VALUES (1, 1, 'Einkaufen', 'Test');

--
-- Setting
--

INSERT INTO settings (name, value, type, description)
VALUES ('access.code.admin', 'DFO-Admin', 'string', 'The access code for the admin user role');
INSERT INTO settings (name, value, type, description)
VALUES ('access.code.user', 'DFO-Friend', 'string', 'The access code for the normal user role');
