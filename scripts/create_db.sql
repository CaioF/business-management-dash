CREATE TABLE time_zones (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE cities(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL
);

CREATE TYPE ROLE AS ENUM ('ADMIN', 'USER');

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    user_role ROLE NOT NULL,
    password VARCHAR(20) NOT NULL,
    time_zone BIGINT NOT NULL REFERENCES time_zones(id)
);

CREATE TABLE user_city_permissions(
    user_id BIGINT NOT NULL REFERENCES users(id),
    city_id BIGINT NOT NULL REFERENCES cities(id),
    PRIMARY KEY (user_id, city_id)
);

CREATE TABLE businesses(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city_id BIGINT NOT NULL REFERENCES cities(id),
    review_count INT NOT NULL DEFAULT 0,
    contacted_at TIMESTAMP WITHOUT TIME ZONE,
    contacted_by BIGINT REFERENCES users(id)
);
