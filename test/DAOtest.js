const {User} = require('../src/models/user.js');

let userDAO = require('../src/dao/userDAO.js');

let user = new User('dm', '12345', 'user', 'dm@gmail.com', 'C:/avatar.jpg');

userDAO.create(user);