module.exports.User = class User {
    constructor(username, password, role, email, avatar) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.avatar = avatar;
    }
}