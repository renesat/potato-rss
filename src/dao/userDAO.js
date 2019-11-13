
var db = require('../../config/db');

var userDAO = {
    create: function(user) {

    	let values = [0, user.username, user.password, user.role, user.email, user.avatar];

        db.run(`INSERT INTO USERS VALUES (?, ?, ?, ?, ?, ?)`, values, function(err) {
		    if (err) {
		      return console.log(err.message);
		    }
		    // get the last insert id
		    console.log(`A row has been inserted with rowid ${this.lastID}`);
		});
    }
}

module.exports = userDAO;