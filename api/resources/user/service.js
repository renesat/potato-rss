const db = require('../../common/db');

const prepareUser = async (user) => {
    return user.toJSON();
};

const prepareToken = async (token) => {
    return token.toJSON();
};

const createUser = async (data) => {
    let user = await db.User.createUser(
        data.username,
        data.password,
        data.email
    );
    user = await prepareUser(user);
    return user;
};

const createToken = async (user) => {
    let token = await user.refreshToken();
    token = prepareToken(token);
    return token;
};

const changeProfile = async (user, data) => {
    let changed_user = await user.update(
        data
    );
    changed_user = await prepareUser(user);
    return changed_user;
};

const getUserInfo = async (user) => {
    return await prepareUser(user);
};

const deleteUser = async (user) => {
    let old_user = await prepareUser(user);
    await user.destroy();
    return old_user;
};

module.exports = {
    getUserInfo: getUserInfo,
    createUser: createUser,
    changeProfile: changeProfile,
    createToken: createToken,
    deleteUser: deleteUser
};
