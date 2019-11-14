const sqlite3 = require('sqlite3').verbose();

  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});