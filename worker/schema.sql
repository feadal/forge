-- Install counts for /stats. Kept per install: a random number made by the app, the first and last
-- day it pinged, the days it was opened, and whether and on which day a program was built. Nothing else.
-- ready_day was added on 26 Oct 2026; an older database needs, once:
--   ALTER TABLE installs ADD COLUMN ready_day TEXT;
--   UPDATE installs SET ready_day = first_day WHERE ready = 1 AND ready_day IS NULL;
CREATE TABLE IF NOT EXISTS installs (
  id TEXT PRIMARY KEY,
  first_day TEXT NOT NULL,
  last_day TEXT NOT NULL,
  ready INTEGER NOT NULL DEFAULT 0,
  ready_day TEXT
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
