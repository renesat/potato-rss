const db = require('../../common/db');

const getNewsList = (source_id) => {
    return db.News.getNewsList(
        source_id
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

const swapFavourite = (news_id) => {
    return db.News.swapFavourite(
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

module.exports.getNewsList = getNewsList;
module.exports.getNews = getNews;
module.exports.swapFavourite =  swapFavourite;
