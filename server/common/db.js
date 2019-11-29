const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './serverdb.sqlite',
    },
    useNullAsDefault: true,
});

const db = require('bookshelf')(knex);

const createDB = (db) => {
    db.knex.schema
        .createTable('tags', (table) => {
            table.increments('id');
            table.string('title', 255).notNullable().unique();
        }).then(() => {
            console.log('Created Table: tags');
        });
    db.knex.schema
        .createTable('news', (table) => {
            table.increments('id');
            table.integer('source_id').notNullable()
                .references('sources.id');
            table.string('title', 255).notNullable();
            table.string('description', 255);
            table.boolean('favourite').notNullable();
            table.string('link',  255).notNullable();
            table.binary('rss_data').notNullable();
        }).then(() => {
            console.log('Created Table: news');
        });
    db.knex.schema
        .createTable('news_tags', (table) => {
            table.integer('news_id').notNullable()
                .references('news.id');
            table.integer('tag_id').notNullable()
                .references('tags.id');
        }).then(() => {
            console.log('Created Table: news_tags');
        });
    db.knex.schema
        .createTable('sources', (table) => {
            table.increments('id');
            table.integer('user_id').notNullable()
                .references('users.id');
            table.string('title', 255).notNullable();
            table.string('description', 255);
            table.string('link', 255).notNullable();
        }).then(() => {
            console.log('Created Table: sources');
        });
    db.knex.schema
        .createTable('users', (table) => {
            table.increments('id');
            table.integer('role_id').notNullable()
                .references('reles.id');
            table.string('username', 255).notNullable().unique();
            table.string('password', 255).notNullable();
            table.string('email', 255).notNullable().unique();
            table.binary('avatar', 255);
        }).then(() => {
            console.log('Created Table: users');
        });
    db.knex.schema
        .createTable('auth', (table) => {
            table.increments('id');
            table.integer('user_id').notNullable()
                .references('users.id');
            table.string('token', 255).notNullable().unique();
            table.datetime('creation_time').notNullable();
            table.timestamp('life_time').notNullable();
        }).then(() => {
            console.log('Created Table: auth');
        });
    db.knex.schema
        .createTable('roles', (table) => {
            table.increments('id');
            table.string('name', 255).notNullable().unique();
        }).then(() => {
            console.log('Created Table: roles');
        });
};

const dropDB = (db) => {
    db.knex.schema
        .dropTable('tags')
        .dropTable('news')
        .dropTable('sources')
        .dropTable('users')
        .dropTable('auth')
        .dropTable('news_tags')
        .dropTable('roles')
        .then(() => {
            console.log('drop DB');
        });
};

const Tags = db.model('Tags', {
    tableName: 'TAGS',
    news() {
        return this.belongsToMany('News');
    }
}, {
});

const News = db.model('News', {
    tableName: 'NEWS',
    tags() {
        return this.belongsToMany('Tags');
    },
    addTags(tags = []) {
        return Tags.
    }
}, {
});

const Users = db.model('Users', {
    tableName: 'USERS',
}, {
});

const Sources = db.model('Sources', {
    tableName: 'SOURCES',
}, {
});

const Roles = db.model('Roles', {
    tableName: 'ROLES',
}, {
});

const Auth = db.model('Auth', {
    tableName: 'AUTH',
}, {
});


module.exports = {
    db: db,
    knex: knex,
    News: News,
    Tags: Tags,
    Roles: Roles,
    Users: Users,
    Sources: Sources,
    Auth: Auth,
    createDB: createDB,
    dropDB: dropDB
};
