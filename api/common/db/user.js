const {db} = require('./base');
const {Auth} = require('./auth');
const {Role} = require('./role');
const {Source} = require('./source');
const {News} = require('./news');

const errors = require('../errors');

const User = db.model(
    'User',
    {
        tableName: 'users',
        initialize: function() {
            this.on('destroying', this.destroyUserData);
            this.on('saving', this.assertUserUnique);
            this.on('saving', this.assertEmailUnique);
        },
        checkPassword(password) {
            return this.password == password;
        },
        token() {
            return this.hasOne('Auth');
        },
        sources() {
            return this.hasMany('Source');
        },
        role() {
            return this.belongsTo('Role');
        },
        refreshToken() {
            return Auth.refreshUserToken(this.id);
        },
        update(data) {
            return this.save(data, {patch: true}).then(user => {
                return user;
            });
        },
        async getNewsList(sourceID = undefined, page = undefined) {
            let sources;
            if (sourceID) {
                await Source.getInfo(
                    this.id,
                    sourceID
                );
                sources = await [sourceID];
            } else {
                sources = await Source.getUserSources(this.id).then(sources => {
                    return sources.map(source => {
                        return source.id;
                    });
                });
            }

            let whereParams = {};
            whereParams['source_id'] = sources;

            let fetchParams = {withRelated: ['tags']};
            // fetchParams['debug'] = true;
            if (page) {
                fetchParams['page'] = page;
            }

            return News.query(
                'where', 'source_id', 'in', sources
            ).orderBy('date', 'ASC').fetchPage(
                fetchParams
            ).then(newsList => {
                return newsList;
            });
        },
        assertEmailUnique() {
            if (this.isNew() || this.hasChanged('email')) {
                return User
                    .query('where', 'email', this.get('email'))
                    .fetch({require: false})
                    .then(function(existing) {
                        if (existing) {
                            throw new errors.EmailExistsError();
                        }
                    });
            }
        },
        assertUserUnique() {
            if (this.isNew() || this.hasChanged('username')) {
                return User
                    .query('where', 'username', this.get('username'))
                    .fetch({require: false})
                    .then(function(existing) {
                        if (existing) {
                            throw new errors.UserExistsError();
                        }
                    });
            }
        },
        async destroyUserData() {
            await this.related('sources').fetch().then(sources =>{
                sources.invokeMap('destroy');
            });
            await this.related('token').fetch().then(token => {
                if (token) {
                    token.destroy();
                }
            });
        }
    },
    {
        async createUser(username, password, email, role = 'user') {
            let roleID = await Role.getRoleID(role);
            return new User({
                username: username,
                password: password,
                email: email,
                role_id: roleID
            }).save().then(user => {
                return user;
            });
        }
    }
);

module.exports.User = User;
