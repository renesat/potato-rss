const {db} = require('./base');

const News = db.model(
    'News',
    {
        tableName: 'news',
        tags() {
            return this.belongsToMany('Tag', 'news_tags', 'tag_id', 'news_id');
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
            }).fetch({withRelated: ['tags']}).then(news => {
                return news;
            });
        },
        async getNewsList(sourceID = undefined, page = undefined) {
            let sources;
            if (sourceID) {
                sources = [sourceID];
            } else {
                sources = User.getUserSources(newsID);
            }

            let whereParams = {};
            if (sourceID) {
                whereParams['source_id'] = sourceID;
                await new Source({id: sourceID}).fetch().then(source => {
                    return source;
                });
            }

            let fetchParams = {withRelated: ['tags']};
            if (page) {
                fetchParams['page'] = page;
            }
            return News.where(
                whereParams
            ).orderBy('date', 'ASC').fetchPage(
                fetchParams
            ).then(newsList => {
                return {
                    items: newsList,
                    isLastPage: newsList.pagination['page'] == newsList.pagination['pageCount'],
                    page: newsList.pagination['page'],
                    pageCount: newsList.pagination['pageCount']
                };
            });
        },
        swapFavourite(news_id) {
            return News.where({
                id: news_id,
            }).fetch().then(news => {
                console.log(news.attributes.favourite);
                return news.save(
                    {favourite: !news.attributes.favourite},
                    {patch: true}
                ).then(news => {
                    return news.fetch({withRelated: ['tags']});
                });
            });
        }
    }
);

module.exports.News = News;
