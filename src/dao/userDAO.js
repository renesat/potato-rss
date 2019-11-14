

var userDAO = {
    create: function(user, db) {
    	// var db = require('../db.js');

    	let id = -1;

    	let values = [user.username, user.password, user.role, user.email, user.avatar];
		db.serialize(function() {
	        db.run('INSERT INTO USERS (USERNAME, PASSWORD, ROLE_ID, EMAIL, AVATAR) VALUES (?, ?, ?, ?, ?)', values, function(err) {
			    if (err) {
			      return console.log(err.message);
			    }
			    console.log(`User has been inserted with id ${this.lastID}`);
			    id = this.lastID;
			});
	    });
	   
		return id;
    },

    delete: function(username, db) {
    	db.serialize(function() {
        	db.run('DELETE FROM USERS WHERE username=?', username, function(err) {
			    if (err) {
		 		    return console.log(err.message);
			    }
		    	console.log(`User has been deleted with id ${this.lastID}`);
			});
        });

    },

    update: function(user, db) {
    	let values = [user.username, user.password, user.role, user.email, user.avatar, user.id];
		db.serialize(function() {
	        db.run('UPDATE USERS SET USERNAME = ?, PASSWORD = ?, ROLE_ID = ?, EMAIL = ?, AVATAR = ? WHERE USER_ID = ?', values, function(err) {
			    if (err) {
			      return console.log(err.message);
			    }
			    console.log(`User has been updated with id ${this.lastID}`);
			});
	    });
    },

    selectById: function(userId, db) {

    	const {User} = require('../models/user.js');

    	let usr = undefined;

		db.serialize(function() {
	        db.all('SELECT * FROM USERS WHERE USER_ID = ?', userId, (err, rows) => {
				if (err) {
					return console.log(err.message);
				}
				rows.forEach((row) => {
					// console.log(new User(row.USER_ID, row.USERNAME, row.PASSWORD, row.ROLE_ID, row.EMAIL, row.AVATAR));
				    usr = new User(row.USER_ID, row.USERNAME, row.PASSWORD, row.ROLE_ID, row.EMAIL, row.AVATAR);
				});
				console.log(`User has been selected with id ${usr.userId}`);
			});
		});

		return usr;
    }
};

module.exports = userDAO;