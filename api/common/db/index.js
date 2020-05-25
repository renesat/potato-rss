const {db, knex, createDB, dropDB} = require('./base');
const {News} = require('./news');
const {Tag} = require('./tag');
const {Role} = require('./role');
const {User} = require('./user');
const {Source} = require('./source');
const {Auth} = require('./auth');

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
