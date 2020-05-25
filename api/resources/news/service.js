const db = require('../../common/db');

const prepareNews = (news) => {
    let json_news = news.toJSON();
    json_news['tags'] = json_news['tags'].map(tag => {
        return tag.title;
    });
    return json_news;
};

const prepareNewsList = async (newsList) => {
    return {
        items: await newsList.map(prepareNews),
        isLastPage: newsList.pagination['page'] >= newsList.pagination['pageCount'],
        page: newsList.pagination['page'],
        pageCount: newsList.pagination['pageCount']
    };
};

const getNewsList = async (user, sourceID, page) => {
    let newsList = await user.getNewsList(
        sourceID, page
    );
    return prepareNewsList(newsList);
};

const getNews = async (newsID) => {
    let news = await db.News.getNews(
        newsID
    );
    return prepareNews(news);
};

const swapFavourite = async (newsID) => {
    let news = await db.News.swapFavourite(
        newsID
    );
    return prepareNews(news);
};

const addTag = async (newsID, tagName) => {
    let news = await db.News.addTag(
        newsID, tagName
    );
    return prepareNews(news);
};

const removeTag = async (newsID, tagName) => {
    let news = await db.News.removeTag(
        newsID, tagName
    );
    return prepareNews(news);
};


module.exports.getNewsList = getNewsList;
module.exports.getNews = getNews;
module.exports.swapFavourite =  swapFavourite;
module.exports.addTag = addTag;
module.exports.removeTag = removeTag;
