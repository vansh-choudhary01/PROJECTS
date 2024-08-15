CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50)
);