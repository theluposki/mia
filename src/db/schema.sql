-- Active: 1671493677988@@127.0.0.1@3306
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

SELECT u.name,  p.img_profile, u.nickname 
FROM users AS u 
INNER JOIN profiles AS p 
ON u.id = p.user_id WHERE u.nickname LIKE 'k%';


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


CREATE TABLE IF NOT EXISTS friends (
  id TEXT PRIMARY KEY UNIQUE,
  nickname_ref TEXT NOT NULL,
  user_id TEXT NOT NULL,
  create_at DATE DEFAULT (datetime('now', 'localtime')),
  Foreign Key (nickname_ref) REFERENCES users(nickname),
  Foreign Key (user_id) REFERENCES users(id)
);

SELECT * FROM friends;

SELECT * FROM friends WHERE user_id = "b95cdae4-d36b-4071-ac05-1fe923b8456f"

SELECT u.name, f.nickname_ref AS nickname, p.img_profile FROM friends AS f
INNER JOIN  users AS u ON f.nickname_ref = nickname
INNER JOIN profiles AS p ON p.user_id = u.id 
WHERE f.user_id = "f08284dd-4d23-4825-bd10-9cd26614d3fc";
