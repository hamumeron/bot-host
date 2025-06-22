const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');  // メモリ上DB（ファイルにするならパス指定）

// 初期テーブル作成例
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      token TEXT NOT NULL,
      owner TEXT NOT NULL
    )
  `);
});

module.exports = db;
