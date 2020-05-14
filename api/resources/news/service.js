const db = require('../../common/db');

const getNewsList = (sourceID) => {
    return db.News.getNewsList(
        sourceID
    ).then(newsList => {
        return {
            status: 200,
            data: newsList
        };
    }).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                status: 400,
                data: {
                    error: 'not_found',
                    message: `Not found source ${sourceID}`
                }
            };
        } else {
            throw err;
        }
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
                    message: `Not found news ${newsID}`
                }
            };
        } else {
            throw err;
        }
    });
};

const swapFavourite = (newsID) => {
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
