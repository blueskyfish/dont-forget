--
-- SQLite
-- Create the tables
--

--
-- Users
--

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  roles NOT NULL
);


--
-- Settings
--

DROP TABLE IF EXISTS settings;

CREATE TABLE IF NOT EXISTS settings (
  setting_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT CONSTRAINT uq_setting_names UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL
);
