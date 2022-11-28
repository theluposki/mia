-- Active: 1665975621102@@127.0.0.1@3306
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY UNIQUE,
  name TEXT,
  nickname TEXT UNIQUE,
  email TEXT UNIQUE,
  password TEXT,
  create_at DATE DEFAULT (datetime('now', 'localtime'))
);
INSERT INTO users (id, name, nickname, email, password, create_at)
VALUES 
("Thomas Shelby", "thommy", "tommy@mail.com","$2a$10$.cCooXs6pYJZSBDpxL5FrOI7WacELIsKvuuEatfAScVwxMLx7p4CK");

SELECT *
FROM users;
