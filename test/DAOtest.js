const {User} = require('../src/models/user.js');

let userDAO = require('../src/dao/userDAO.js');

let user = new User(2, 'dm', '12345', 'user', 'dm@gmail.com', 'C:/avatar.jpg');

var id = 0;
async function test() {
	var db = await require('../src/db.js');

	id = userDAO.create(user, db);

	let newUser = userDAO.selectById(2, db);
	user.email = 'dm2@mail.ru';
	console.log(newUser);

    userDAO.update(user, db);

	newUser = userDAO.selectById(2, db);

	console.log(newUser);

	// console.assert(0 == 1);

	// console.assert(newUser.email == user.email);

	// userDAO.delete('dm', db);

	// newUser = userDAO.selectById(id);

	// console.assert(newUser == null);

	db.close();
}


test();

console.log(id);
