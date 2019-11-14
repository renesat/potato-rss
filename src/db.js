const sqlite3 = require('sqlite3').verbose();

module.exports = new sqlite3.Database('./potato-rss.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});