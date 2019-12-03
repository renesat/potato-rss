const uuidv4 = require('uuid/v4');

const db = require('../../common/db');

const createUser = async (data) => {
    data['role_id'] = await db.Role.getRoleID('user');
    return new db.User(data).save().then(user => {
        return user;
    }).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const _generateToken = () => {
    return {
        token: uuidv4(),
        creation_time: Date.now(),
        life_time: global.appConfig['secure']['token_life_time']
    };
};

const createToken = async (user) => {
    return new db.Auth({
        user_id: user.id
    }).fetch({require: false}).then(token => {
        if (token) {
            token.destroy();
        }
        const new_token = _generateToken();
        return new db.Auth({
            user_id: user.id,
            ...new_token
        }).save().then(token => {
            return token;
        });
    });
};

const changeProfile = (user, data) => {
    delete data.role_id;
    delete data.id;
    return new db.User().where({
        id: user.id
    }).save(data, {patch: true}).then(user => {
        return user;
    });
};

const getUserInfo = (user) => {
    return user.toJSON();
};

const deleteUser = (user) => {
    return db.User.deleteUser(user);
};

module.exports = {
    getUserInfo: getUserInfo,
    createUser: createUser,
    changeProfile: changeProfile,
    createToken: createToken,
    deleteUser: deleteUser
};
