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
            table.increments('id').unique().primary();
            table.string('title', 255).notNullable().unique();
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
            table.increments('id').primary();
            table.string('name', 255).notNullable().unique();
        }).then(() => {
            console.log('Created Table: roles');
        });
};

const dropDB = (db) => {
    db.knex.schema.
        dropTableIfExists('tags').
        dropTableIfExists('news').
        dropTableIfExists('sources').
        dropTableIfExists('users').
        dropTableIfExists('auth').
        dropTableIfExists('news_tags').
        dropTableIfExists('roles').
        then(() => {
            console.log('drop DB');
        });
};

module.exports = {
    db: db,
    knex: knex,
    createDB: createDB,
    dropDB: dropDB
};
