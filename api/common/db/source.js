const {db} = require('./base');
const rss = require('../rss');
const intel = require('intel');

const {News} = require('./news');

const Source = db.model(
    'Source',
    {
        tableName: 'sources',
        news() {
            return this.hasMany('News');
        },
        user() {
            return this.belongsTo('User');
        }
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
            return new Source({
                id: id_source,
                user_id: user_id
            }).save(data, {patch: true}).then(source => {
                return source;
            });
        },
        getInfo(user_id, id_source) {
            return new Source({
                id: id_source,
                user_id: user_id
            }).fetch({require: true}).then(source => {
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
        getUserSources(user_id) {
            return Source.where({
                user_id: user_id
            }).fetchAll().then(sources => {
                return sources;
            });
        },
        deleteSource(idSource) {
            return new Source({
                id: idSource
            }).fetch().then(source => {
                source.destroy();
                return source;
            });
        }
    }
);

module.exports.Source = Source;
