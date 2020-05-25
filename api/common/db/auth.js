const {db} = require('./base');

const Auth = db.model(
    'Auth',
    {
        tableName: 'auth',
        user() {
            return this.belongsTo('User');
        },
        isLife() {
            const diffTime = Math.round(
                (Date.now()-this.get('creation_time'))/1000
            );
            return diffTime < this.get('life_time');
        }
    },
    {
        generateToken() {
            const uuidv4 = require('uuid/v4');
            return {
                token: uuidv4(),
                creation_time: Date.now(),
                life_time: global.appConfig['secure']['token_life_time']
            };
        },
        createToken(user_id, token) {
            return new Auth({
                user_id: user_id,
                ...token
            }).save().then(token => {
                return token;
            });
        },
        refreshUserToken(user_id) {
            return new Auth({
                user_id: user_id
            }).fetch({require: false}).then(token => {
                if (token) {
                    token.destroy();
                }
                const new_token = Auth.generateToken();
                return Auth.createToken(
                    user_id,
                    new_token
                );
            });
        }
    }
);

module.exports.Auth = Auth;
