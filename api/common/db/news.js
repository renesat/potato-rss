const {db} = require('./base');
const {Tag} = require('./tag');

const errors = require('../errors');

const News = db.model(
    'News',
    {
        initialize: function() {
            this.on('fetching', (model, columns, options) => {
                if (options.withRelated === undefined) {
                    options.withRelated = ['tags'];
                } else {
                    options.withRelated = [...options.withRelated, 'tags'];
                }
            });
        },
        tableName: 'news',
        tags() {
            return this.belongsToMany('Tag', 'news_tags', 'news_id', 'tag_id');
        },
        source() {
            return this.belongsTo('Source');
        }
    },
    {
        /**
         * Change news data to new data if is changed
         */
        async refreshNews(source_id, data) {
            const news = await new News({
                source_id: source_id,
                guid: data['guid']
            }).fetch({require: false, withRelated: ['tags']}).then(news => {
                return news;
            });
            if ((news !== null) &&
                news.attributes.rss_data_hash === data['rss_data_hash']) {
                return news;
            }
            if (news !== null) {
                return new News({
                    id: news.id
                }).save(
                    data,
                    {patch: true, withRelated: ['tags']}
                ).then(news => {
                    return news;
                });
            } else {
                return new News(
                    {
                        source_id: source_id,
                        ...data
                    }
                ).save().then(nnews => {
                    return News.where({
                        id: nnews.id
                    }).fetch({withRelated: ['tags']}).then(news => {
                        return news;
                    });
                });
            }
        },
        getNews(news_id) {
            return new News({
                id: news_id
            }).fetch({require: false}).then(news => {
                if (!news) {
                    throw new errors.NotFoundPropertyError('news', news_id);
                }
                return news;
            });
        },
        swapFavourite(news_id) {
            return News.getNews(news_id).then(news => {
                return news.save(
                    {favourite: !news.attributes.favourite},
                    {patch: true}
                ).then(news => {
                    return news.fetch();
                });
            });
        },
        addTag(newsID, tagName) {
            return News.getNews(newsID).then(async news => {
                let tag = await new Tag({
                    title: tagName
                }).fetch({require: false}).then(tag => {
                    return tag;
                });
                if (!tag) {
                    tag = await new Tag({
                        title: tagName
                    }).save().then(tag => {
                        return tag;
                    });
                }
                if (news.related('tags').get(tag) === undefined) {
                    await news.tags().attach(tag);
                }
                return News.getNews(newsID);
            });
        },
        removeTag(newsID, tagName) {
            return News.getNews(newsID).then(async news => {
                let tag = await new Tag({
                    title: tagName
                }).fetch({require: false}).then(tag => {
                    return tag;
                });
                if (!tag) {
                    return news;
                }
                if (!(news.related('tags').get(tag) === undefined)) {
                    await news.tags().detach(tag);
                }
                return News.getNews(newsID);
            });
        },
    }
);

module.exports.News = News;
