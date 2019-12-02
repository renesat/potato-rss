
const db = require('../../common/db');

// TODO
const getUserInfo = (user) => {
    console.log(user);
    return user.toJSON();
};

module.exports = {
    getUserInfo: getUserInfo
};
