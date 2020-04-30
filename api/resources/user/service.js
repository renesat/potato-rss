const db = require('../../common/db');

const createUser = async (data) => {
    data['role_id'] = await db.Role.getRoleID('user');
    return db.User.createUser(
        data
    ).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const createToken = async (user) => {
    return user.refreshToken(
    ).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const changeProfile = async (user, data) => {
    // TODO: Add validation
    return user.update(
        data
    ).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const getUserInfo = (user) => {
    return user.toJSON();
};

const deleteUser = (user) => {
    return user.delete();
};

module.exports = {
    getUserInfo: getUserInfo,
    createUser: createUser,
    changeProfile: changeProfile,
    createToken: createToken,
    deleteUser: deleteUser
};
