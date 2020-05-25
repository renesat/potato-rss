const {db} = require('./base');

const Tag = db.model(
    'Tag',
    {
        tableName: 'tags',
        news() {
            return this.belongsToMany('News', 'news_tags', 'news_id', 'tags_id');
        }
    },
    {
    }
);

module.exports.Tag = Tag;
