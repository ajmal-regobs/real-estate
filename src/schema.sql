CREATE TABLE IF NOT EXISTS plots (
  id            SERIAL PRIMARY KEY,
  title         TEXT NOT NULL,
  location      TEXT NOT NULL,
  area_sqft     NUMERIC(12, 2) NOT NULL CHECK (area_sqft > 0),
  price         NUMERIC(14, 2) NOT NULL CHECK (price >= 0),
  description   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
