const {db} = require('./base');

const Tag = db.model(
    'Tag',
    {
        tableName: 'tags',
        news() {
            return this.belongsToMany('News', 'news_tags', 'tag_id', 'news_id');
        }
    },
    {
    }
);

module.exports.Tag = Tag;
