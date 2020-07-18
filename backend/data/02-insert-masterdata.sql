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
-- Setting
--

INSERT INTO settings (name, value, type, description)
VALUES ('access.code.admin', 'DFO-Admin', 'string', 'The access code for the admin user role');
INSERT INTO settings (name, value, type, description)
VALUES ('access.code.user', 'DFO-Friend', 'string', 'The access code for the normal user role');
