import { openDb } from "../db/index.js";

export const Profiles = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
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
      `);
    });
  },

  insert(body) {
    const {
      id, 
      messagemStatus,
      status,
      imgProfile,
      imgFrontCover,
      bio,
      telephone,
      birthDate,
      localization,
      userId
    } = body

    try {
      openDb().then((db) => {
        return db.run(`
          INSERT INTO profiles 
          (id, messagem_status, status, img_profile, img_frontCover, bio, telephone,birthDate,localization,user_id) 
          VALUES (?,?,?,?,?,?,?,?,?,?);`, [
            id, 
            messagemStatus,
            status,
            imgProfile,
            imgFrontCover,
            bio,
            telephone,
            birthDate,
            localization,
            userId
          ]);
      });
      return "profile successfully added!"
    } catch {
      return "error adding."
    }
  },

  async readAll() {
    try {
      return openDb().then(async (db) => {
        const data = await db.all("SELECT * FROM profiles;");
        return data;
      });
    } catch {
      return "search error"
    }
  },

  async getMyProfile(id) {
    try {
      return openDb().then(async (db) => {
        const data = await db.get("SELECT *FROM profiles WHERE user_id=?;", [id]);
        return data;
      });
    } catch {
      return "search error"
    }
  },
}
