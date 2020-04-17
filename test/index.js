const {loadConfig} = require('../api/common/utils');
const config = loadConfig('./resources/config.toml');
const env = process.env.NODE_ENV || 'default';
global.appConfig = {...config['default'], ...config[env]};

let db = require('../api/common/db');

(async () => {
    await db.dropDB(db.db);
    await db.createDB(db.db);

    // Roles
    let user_role = await new db.Role({
        name: 'user'
    }).save().then(role => {
        return role;
    });

    // Users
    // let user1 = await new db.User({
    //     role_id: user_role.id,
    //     username: 'Havy1975',
    //     password: 'Xee3De0ho9',
    //     email: 'ChristineDCruz@rhyta.com'
    // }).save().then(user => {
    //     console.log('Create user1')
    //     return user;
    // });
    // let user2 = await new db.User({
    //     role_id: user_role.id,
    //     username: 'Difer1954',
    //     password: 'mei4eiD0',
    //     email: 'CarrieREvans@teleworm.us'
    // }).save().then(user => {
    //     console.log('Create user2');
    //     return user;
    // });
    // let user3 = await new db.User({
    //     role_id: user_role.id,
    //     username: 'Scor1972',
    //     password: 'doaGahquie5',
    //     email: 'JackDYoung@teleworm.us'
    // }).save().then(user => {
    //     console.log('Create user3');
    //     return user;
    // });

    // // Token
    // let token_user1 = await new db.Auth({
    //     user_id: user1.id,
    //     token: '415e148d-6183-48bb-b27b-cca51f2dde96',
    //     creation_time: Date.now(),
    //     life_time: 10000000000000
    // }).save().then(token => {
    //     console.log('Create token for user1');
    //     return token;
    // });
    // let token_user2 = await new db.Auth({
    //     user_id: user2.id,
    //     token: 'bd2d7688-afcf-4b82-a539-eb8a41f02a1b',
    //     creation_time: Date.now(),
    //     life_time: 10000000000000
    // }).save().then(token => {
    //     console.log('Create token for user2');
    //     return token;
    // });

    // // Sources
    // let source1_user1 = await new db.Source({
    //     user_id: user1.id,
    //     title: 'Habr: Лучшее за сутки',
    //     link: 'https://habr.com/ru/rss/best/daily/?fl=ru'
    // }).save().then(token => {
    //     console.log('Create source for user1');
    //     return token;
    // });
    // let source2_user1 = await new db.Source({
    //     user_id: user1.id,
    //     title: 'Hacker News',
    //     link: 'https://news.ycombinator.com/rss'
    // }).save().then(token => {
    //     console.log('Create source for user1');
    //     return token;
    // });
})();
