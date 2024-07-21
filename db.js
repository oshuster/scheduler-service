import sqlite from "sqlite3";
sqlite.verbose();

const db = new sqlite.Database("./database/queue.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

db.serialize(() => {
  // Створення таблиці requests
  db.run(
    `CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    body TEXT NOT NULL,
    response TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
  )`,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  // Тригер для оновлення updated_at при зміні запису
  db.run(
    `CREATE TRIGGER IF NOT EXISTS set_timestamp
          AFTER UPDATE ON requests
          FOR EACH ROW
          BEGIN
            UPDATE requests SET updated_at = datetime('now', 'localtime')
            WHERE id = OLD.id;
          END;`,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
});

export default db;
