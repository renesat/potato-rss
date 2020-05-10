const {getNews} = require('./rss');

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: global.appConfig['db_path']
    },
    useNullAsDefault: true,
});

const db = require('bookshelf')(knex);

const createDB = (db) => {
    db.knex.schema.
        createTable('tags', (table) => {
            table.increments('id').primary();
            table.string('title', 255).notNullable().unique();
            table.primary(['title', 'id']);
        }).then(() => {
            console.log('Created Table: tags');
        });
    db.knex.schema.
        createTable('news', (table) => {
            table.increments('id').primary();
            table.integer('source_id').notNullable().
                references('sources.id');
            table.string('guid').notNullable();
            table.string('title', 255).notNullable();
            table.text('content');
            table.string('link',  255).notNullable();
            table.datetime('date').notNullable();
            table.boolean('favourite').notNullable();
            table.binary('rss_data').notNullable();
            table.string('rss_data_hash').notNullable();
        }).then(() => {
            console.log('Created Table: news');
        });
    db.knex.schema.
        createTable('news_tags', (table) => {
            table.integer('news_id').notNullable().
                references('news.id');
            table.integer('tag_id').notNullable().
                references('tags.id');
            table.primary(['news_id', 'tag_id']);
        }).then(() => {
            console.log('Created Table: news_tags');
        });
    db.knex.schema.
        createTable('sources', (table) => {
            table.increments('id').primary();
            table.integer('user_id').notNullable().
                references('users.id');
            table.string('title', 255).notNullable();
            table.string('description', 255);
            table.string('link', 255).notNullable();
        }).then(() => {
            console.log('Created Table: sources');
        });
    db.knex.schema.
        createTable('users', (table) => {
            table.increments('id').primary();
            table.integer('role_id').notNullable().
                references('roles.id');
            table.string('username', 255).notNullable().unique();
            table.string('password', 255).notNullable();
            table.string('email', 255).notNullable().unique();
            table.binary('avatar');
        }).then(() => {
            console.log('Created Table: users');
        });
    db.knex.schema.
        createTable('auth', (table) => {
            table.increments('id').primary();
            table.integer('user_id').notNullable().
                references('users.id').unique();
            table.string('token', 255).notNullable().unique();
            table.datetime('creation_time').notNullable();
            table.timestamp('life_time').notNullable();
        }).then(() => {
            console.log('Created Table: auth');
        });
    db.knex.schema.
        createTable('roles', (table) => {
            table.increments('id');
            table.string('name', 255).notNullable().unique();
            table.primary(['id', 'name']);
        }).then(() => {
            console.log('Created Table: roles');
        });
};

const dropDB = (db) => {
    db.knex.schema.
        dropTable('tags').
        dropTable('news').
        dropTable('sources').
        dropTable('users').
        dropTable('auth').
        dropTable('news_tags').
        dropTable('roles').
        then(() => {
            console.log('drop DB');
        });
};

const Tag = db.model('Tag', {
    tableName: 'tags',
    news() {
        return this.belongsToMany('News');
    }
}, {
});

const News = db.model('News', {
    tableName: 'news',
    tags() {
        return this.belongsToMany('Tags');
    },
    source() {
        return this.belongsTo('Source');
    }
}, {
    async updateNewsData(source_id, data) {
        const news = News.where({
            source_id: source_id,
            guid: data['guid']
            // rss_data_hash: data['rss_data_hash']
        }).fetch({require: false}).then(news => {
            return news;
        });
        if (!await news) {
            return new News({
                source_id: source_id,
                ...data
            }).save().then(news => {
                return news;
            });
        } else {
            if ((await news).attributes.rss_data_hash === data['rss_data_hash']) {
                return news;
            } else {
                return new News({
                    id: (await news).attributes.id
                }).save(data, {patch: true}).then(news => {
                    return news;
                });
            }
        }
    },
    getNews(news_id) {
        return new News({
            id: news_id
        }).fetch().then(news => {
            return news;
        });
    },
    getUserNewsList(user_id) {
        return Source.with({
            user_id: user_id
        }).fetchAll({require: false, withRelated: ['news']}).then(sources => {
            let newsList = [];
            for (let i in sources) {
                let source = sources[i];
                if (source.related('news')) {
                    newsList.push.apply(
                        newsList,
                        source.related('news')
                    );
                }
            }
            return newsList;
        });
    },
    getNewsList(source_id) {
        return News.where({
            source_id: source_id
        }).fetchAll().then(newsList => {
            return newsList;
        });
    },
    updateNews(news_id, data) {
        return new News({
            id: news_id,
        }).fetch().then(_user => { // eslint-disable-line no-unused-vars
            return new News({
                id: news_id,
            }).save(data, {patch: true}).then(news => {
                return news;
            });
        });
    }
});

const User = db.model('User', {
    tableName: 'users',
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
    delete() {
        return new User({
            id: this.id
        }).fetch({withRelated: ['sources', 'token']}).then(user => {
            user.related('sources').invokeThen('destroy');
            user.related('token').destroy();
            user.destroy();
            return this;
        });
    },
    refreshToken() {
        return Auth.refreshUserToken(this.id);
    },
    update(data) {
        delete data.role_id;
        delete data.id;
        return this.save(data, {patch: true}).then(user => {
            return user;
        });
    }
}, {
    createUser(userData) {
        return new User(userData).save().then(user => {
            return user;
        });
    }
});

const Source = db.model('Source', {
    tableName: 'sources',
    news() {
        return this.hasMany('News');
    },
    user() {
        return this.belongsTo('User');
    }
}, {
    updateNews(user_id = undefined, source_id =  undefined) {
        return Source.where({
            // user_id: user_id,
            // id: source_id
        }).fetchAll().then(sources => {
            sources.forEach(async source => {
                let items = await getNews(source.attributes.link);
                if (items) {
                    for (let i in items) {
                        await News.updateNewsData(
                            source.id,
                            items[i]
                        );
                    }
                }
            });
        });
    },
    updateSource(user_id, id_source, data) {
        return new Source({
            id: id_source,
            user_id: user_id
        }).save(data, {patch: true}).then(source => {
            return source;
        });
    },
    getInfo(user_id, id_source) {
        return new Source({
            id: id_source,
            user_id: user_id
        }).fetch({require: true}).then(source => {
            return source;
        });
    },
    createSource(user_id, data) {
        return new Source({
            user_id: user_id,
            ...data
        }).save().then(source => {
            return source;
        });
    },
    getUserSources(user_id) {
        return Source.where({
            user_id: user_id
        }).fetchAll().then(sources => {
            return sources;
        });
    },
    deleteSource(idSource) {
        return new Source({
            id: idSource
        }).fetch({withRelated: ['news']}).then(source => {
            source.related('news').invokeThen('destroy');
            source.destroy();
            return source;
        });
    }
});

const Role = db.model('Role', {
    tableName: 'roles',
    users() {
        return this.hasMany('User');
    }
}, {
    getRoleID(name) {
        return new Role({name: name}).fetch().then(role => {
            return role.id;
        });
    }
});

const Auth = db.model('Auth', {
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
}, {
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
});


module.exports = {
    db: db,
    knex: knex,
    News: News,
    Tag: Tag,
    Role: Role,
    User: User,
    Source: Source,
    Auth: Auth,
    createDB: createDB,
    dropDB: dropDB
};
