import { openDb } from "../db/index.js";

export const Users = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY UNIQUE,
          name TEXT,
          nickname TEXT UNIQUE,
          email TEXT UNIQUE,
          password TEXT,
          create_at DATE DEFAULT (datetime('now', 'localtime'))
        );
      `);
    });
  },

  insert(body) {
    const { id, name, nickname, email, password, createAt } = body
    try {
      openDb().then((db) => {
        return db.run(`
          INSERT INTO users 
          (id, name, nickname, email, password, create_at) 
          VALUES (?,?,?,?,?,?);`, [ id, name, nickname, email, password, createAt ]);
      });
      return "Successfully registered!"
    } catch {
      return "Error registering."
    }
  },

  async readAll() {
    try {
      return openDb().then(async (db) => {
        const data = await db.all("SELECT * FROM users;");
        return data;
      });
    } catch {
      return "search error"
    }
  },
  async getOneByEmail(email) {
    try {
      return openDb().then(async (db) => {
        const data = await db.get("SELECT * FROM users WHERE email=?;", [email]);
        return data;
      });
    } catch {
      return "search error"
    }
  },
  async getOneById(id) {
    try {
      return openDb().then(async (db) => {
        const data = await db.get("SELECT * FROM users WHERE id=?;", [id]);
        return data;
      });
    } catch {
      return "search error"
    }
  },
  async getOneByNickName(nickname) {
    try {
      return openDb().then(async (db) => {
        const data = await db.get("SELECT * FROM users WHERE nickname=?;", [nickname]);
        return data;
      });
    } catch {
      return "search error"
    }
  },
}
