const {loadConfig} = require('../api/common/utils');
const config = loadConfig('./resources/config.toml');
const env = process.env.NODE_ENV || 'default';
global.appConfig = {...config['default'], ...config[env]};

let db = require('../api/common/db');

(async () => {
    await db.dropDB(db.db);
    await db.createDB(db.db);

    // Roles
    await new db.Role({
        name: 'user'
    }).save().then(role => {
        console.log('Create user role');
        return role;
    });

})().then(process.exit);
