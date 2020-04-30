const db = require('../../common/db');

const getNewsList = (user) => {
    return db.News.getUserNewsList(
        user.id
    ).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const getNews = (news_id) => {
    return db.News.getNews(
        news_id
    ).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                error: 'not_found',
                message: `Not found news ${news_id}`
            };
        }
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const changeNews = (news_id, data) => {
    const new_data = {
        favourite: data['facourite']
    };
    return db.News.updateNews(
        news_id, new_data
    ).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                error: 'not_found',
                message: `Not found news ${news_id}`
            };
        }
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

module.exports.getNewsList = getNewsList;
module.exports.getNews = getNews;
module.exports.changeNews = changeNews;
