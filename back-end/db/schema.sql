DROP DATABASE IF EXISTS cta_dev;
CREATE DATABASE cta_dev;

\c cta_dev;
-- idk

DROP TABLE IF EXISTS test;

CREATE TABLE test (
    id SERIAL PRIMARY KEY, 
    name TEXT
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    admin BOOLEAN DEFAULT false,
    authkey uuid DEFAULT gen_random_uuid()
    );

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    description TEXT NOT NULL,
    price INT,
    rating INT CHECK (rating >= 0 AND rating <= 5),
    featured BOOLEAN
);