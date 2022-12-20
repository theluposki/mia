import { openDb } from "../db/index.js";

export const Friends = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS friends (
          id TEXT PRIMARY KEY UNIQUE,
          nickname_ref TEXT NOT NULL,
          user_id TEXT NOT NULL,
          create_at DATE DEFAULT (datetime('now', 'localtime')),
          Foreign Key (nickname_ref) REFERENCES users(nickname),
          Foreign Key (user_id) REFERENCES users(id)
        );
      `);
    });
  },

  insert(body) {
    const {
      id, 
      nicknameRef,
      userId
    } = body

    try {
      openDb().then((db) => {
        return db.run(`
          INSERT INTO friends 
          (id, nickname_ref, user_id) 
          VALUES (?,?,?);`, [
            id, 
            nicknameRef,
            userId
          ]);
      });
      return "friend successfully added!"
    } catch {
      return "error adding."
    }
  },

  async readAll(id) {
    try {
      return openDb().then(async (db) => {
        const data = await db.all("SELECT * FROM friends WHERE user_id = ?", [id]);
        return data;
      });
    } catch {
      return "search error"
    }
  },


  async youAreAlreadyFriends(nickname, userId) {
    try {
      return openDb().then(async (db) => {
        const data = await db.all("SELECT * FROM friends WHERE nickname_ref = ? AND user_id = ?", 
        [nickname, userId]);
        return data;
      });
    } catch {
      return "search error"
    }
  },
}
