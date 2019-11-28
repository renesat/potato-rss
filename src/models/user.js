module.exports.User = class User {
    constructor(userId, username, password, role, email, avatar) {
    	this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.avatar = avatar;
    }
};