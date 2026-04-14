require('dotenv').config();
const fs = require('fs');
const path = require('path');
const db = require('./db');

(async () => {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await db.query(sql);
  console.log('Schema applied.');
  await db.pool.end();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
