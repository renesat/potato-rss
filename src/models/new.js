module.exports = class News {
    constructor(newsId, sourceId, title, description, link, rssData) {
        this.newsId = newsId;
        this.sourceId = sourceId;
        this.title = title;
        this.description = description;
        this.link = link;
        this.rssData = rssData;
    }
};