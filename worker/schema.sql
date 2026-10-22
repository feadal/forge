-- Install counts for /stats. An install is a random number made by the app; nothing else is kept.
CREATE TABLE IF NOT EXISTS installs (
  id TEXT PRIMARY KEY,
  first_day TEXT NOT NULL,
  last_day TEXT NOT NULL,
  ready INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS days (
  day TEXT NOT NULL,
  id TEXT NOT NULL,
  PRIMARY KEY (day, id)
) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS asks (
  day TEXT PRIMARY KEY,
  n INTEGER NOT NULL DEFAULT 0
);
