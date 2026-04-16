-- WanderZee Database Initialization
-- This runs automatically when the PostgreSQL container starts for the first time

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create schemas
CREATE SCHEMA IF NOT EXISTS wanderzee;

-- Log
DO $$
BEGIN
    RAISE NOTICE 'WanderZee database initialized successfully!';
END $$;
