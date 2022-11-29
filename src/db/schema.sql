-- Active: 1669747657104@@127.0.0.1@3306
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


CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY UNIQUE,
  messagem_status TEXT,
  status TEXT,
  img_profile TEXT,
  img_frontCover TEXT,
  bio TEXT,
  telephone TEXT,
  birthDate TEXT,
  localization TEXT,
  user_id TEXT NOT NULL,
  create_at DATE DEFAULT (datetime('now', 'localtime')),
  Foreign Key (user_id) REFERENCES users(id)
);


SELECT *
FROM profiles;

SELECT *
FROM profiles WHERE user_id="b95cdae4-d36b-4071-ac05-1fe923b8456f";
