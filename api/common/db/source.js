const {db} = require('./base');
const rss = require('../rss');
const intel = require('intel');

const {News} = require('./news');

const errors = require('../errors');

const Source = db.model(
    'Source',
    {
        tableName: 'sources',
        initialize: function() {
            this.on('destroying', this.destroySourceData);
        },
        news() {
            return this.hasMany('News');
        },
        user() {
            return this.belongsTo('User');
        },
        async destroySourceData() {
            await this.related('news').fetch().then(news =>{
                news.invokeMap('destroy');
            });
        },
    },
    {
        updateNews(source_id = undefined) {
            let whereData = source_id === undefined ? {} : {id: source_id};
            return Source.where(
                whereData
            ).fetchAll().then(sources => {
                sources.forEach(async source => {
                    let items = await rss.getNews(
                        source.attributes.link
                    ).catch(err => {
                        intel.error(
                            `Not update source (id: ${source.id}): ${err.message}`
                        );
                    });
                    if (!items) {
                        return;
                    }
                    for (let i in items) {
                        await News.refreshNews(
                            source.id,
                            items[i]
                        ).catch(err => {
                            intel.error(
                                `Not update news ${items[i]['guid']} in source (id: ${source.id}): ${err.message}`
                            );
                        });
                    }
                });
            });
        },
        updateSource(user_id, id_source, data) {
            return this.getInfo(user_id, id_source).then(source => {
                return source.save(data, {patch: true});
            });
        },
        getInfo(user_id, id_source) {
            return new Source({
                id: id_source,
                user_id: user_id
            }).fetch({require: false}).then(source => {
                if (!source) {
                    throw new errors.NotFoundPropertyError('source', id_source);
                }
                return source;
            });
        },
        createSource(user_id, data) {
            return new Source({
                user_id: user_id,
                ...data
            }).save().then(source => {
                return source;
            });
        },
        getUserSources(userID) {
            return Source.where({
                user_id: userID
            }).fetchAll().then(sources => {
                return sources;
            });
        },
    }
);

module.exports.Source = Source;
