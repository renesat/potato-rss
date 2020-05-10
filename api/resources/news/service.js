const db = require('../../common/db');

const getNewsList = (user) => {
    return db.News.getUserNewsList(
        user.id
    ).then(newsList => {
        return {
            status: 200,
            data: newsList
        };
    });
};

const getNews = (news_id) => {
    return db.News.getNews(
        news_id
    ).then(news => {
        return {
            status: 200,
            data: news
        };
    }).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                status: 400,
                data: {
                    error: 'not_found',
                    message: `Not found news ${news_id}`
                }
            };
        } else {
            throw err;
        }
    });
};

const changeNews = (news_id, data) => {
    const new_data = {
        favourite: data['facourite']
    };
    return db.News.updateNews(
        news_id, new_data
    ).then(news => {
        return {
            status: 200,
            data: news
        };
    }).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                status: 400,
                data: {
                    error: 'not_found',
                    message: `Not found news ${news_id}`
                }
            };
        } else {
            throw err;
        }
    });
};

module.exports.getNewsList = getNewsList;
module.exports.getNews = getNews;
module.exports.changeNews = changeNews;
