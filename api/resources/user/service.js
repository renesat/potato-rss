const db = require('../../common/db');

const createUser = async (data) => {
    data['role_id'] = await db.Role.getRoleID('user');
    let user = await db.User.createUser(data);
    return {
        status: 200,
        data: user
    };
};

const createToken = async (user) => {
    let token = await user.refreshToken();
    return {
        status: 200,
        data: token
    };
};

const changeProfile = async (user, data) => {
    let changed_user = await user.update(
        data
    );
    return {
        status: 200,
        data: changed_user
    };
};

const getUserInfo = async (user) => {
    return {
        status: 200,
        data: await user.toJSON()
    };
};

const deleteUser = async (user) => {
    return {
        status: 200,
        data: await user.delete()
    };
};

module.exports = {
    getUserInfo: getUserInfo,
    createUser: createUser,
    changeProfile: changeProfile,
    createToken: createToken,
    deleteUser: deleteUser
};
