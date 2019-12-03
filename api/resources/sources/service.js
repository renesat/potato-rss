
const db = require('../../common/db');

const getSourcesList = (user) => {
    return new db.Source({
        user_id: user.id
    }).fetchAll().then(sources => {
        return sources;
    });
};

const addSource = (user, data) => {
    return new db.Source({
        user_id: user.id,
        ...data
    }).save().then(source => {
        return source;
    });
};

const getSource = (idSource) => {
    return new db.Source({
        id: idSource
    }).fetch().then(source => {
        return source;
    });
};

const changeSource = (idSource, data) => {
    delete data.user_id;
    delete data.id;
    return new db.Source().where({
        id: idSource
    }).save(data, {patch: true}).then(source => {
        return source;
    });
};

const deleteSource = (idSource) => {
    return db.Source.deleteSource(idSource);
};


module.exports.getSourcesList = getSourcesList;
module.exports.addSource = addSource;
module.exports.getSource = getSource;
module.exports.changeSource = changeSource;
module.exports.deleteSource = deleteSource;
