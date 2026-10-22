-- Install counts for /stats. Kept per install: a random number made by the app, the first and last
-- day it pinged, the days it was opened, and whether a program was built. Nothing else.
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
