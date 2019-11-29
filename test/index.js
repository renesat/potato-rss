global.reqlib = require('app-root-path').require;

// global.appConfig = reqlib('/config/test.js');

let db = reqlib('/server/common/db');

db.dropDB(db.db);
db.createDB(db.db);

// new db.Tags({title: 'hello'}).save().then((tag) => {
//     console.log(tag.toJSON());
// }).error( () => {
// });

// new db.Tags({title: 'lol'}).save().then((tag) => {
//     console.log(tag.toJSON());
// }).error( () => {
// });

let news1 = new db.News({
    source_id: 2, title: 'test',
    favourite: true,
    link: 'lol.org',
    rss_data: '\u0010\u00a0'
});

news1.save().then((news) => {
}).error( () => {
});


console.log(news1.tags());
