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


--
-- groups
--

DROP TABLE IF EXISTS groups;

CREATE TABLE IF NOT EXISTS groups (
  group_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#ffff99',
  icon TEXT NOT NULL DEFAULT 'note-outline',
  owner_id INTEGER
);

--
-- Members
--

DROP TABLE IF EXISTS members;

CREATE TABLE IF NOT EXISTS members (
  member_id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  enable INTEGER NOT NULL DEFAULT 1
);

DROP INDEX IF EXISTS uni_group_members;
CREATE UNIQUE INDEX IF NOT EXISTS uni_group_members ON members (group_id, user_id);


--
-- Notes
--

DROP TABLE IF EXISTS nodes;

CREATE TABLE IF NOT EXISTS notes (
  node_id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  text TEXT DEFAULT NULL,
  state TEXT NOT NULL DEFAULT 'open'
);

DROP INDEX IF EXISTS idx_node_states;
CREATE INDEX IF NOT EXISTS idx_node_states ON "notes" ( "state" ASC );
