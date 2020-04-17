
const db = require('../../common/db');

const getSourcesList = (user) => {
    return new db.Source({
        user_id: user.id
    }).fetchAll({require: false}).then(sources => {
        return sources;
    }).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const addSource = (user, data) => {
    return new db.Source({
        user_id: user.id,
        ...data
    }).save().then(source => {
        return source;
    }).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const getSource = (idSource) => {
    return new db.Source({
        id: idSource
    }).fetch({require: false}).then(source => {
        if (!source) {
            return {
                error: 'not_found',
                message: 'Not found source ${idSource}'
            };
        }
        return source;
    }).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const changeSource = (idSource, data) => {
    delete data._id;
    delete data.id;
    return new db.Source().where({
        id: idSource
    }).save(data, {patch: true}).then(source => {
        if (!source) {
            return {
                error: 'not_found',
                message: 'Not found source ${idSource}'
            }
        }
        return source;
    }).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

// TODO
const addNews = () => {

};


const deleteSource = (idSource) => {
    return db.Source.deleteSource(idSource);
};


module.exports.getSourcesList = getSourcesList;
module.exports.addSource = addSource;
module.exports.getSource = getSource;
module.exports.changeSource = changeSource;
module.exports.deleteSource = deleteSource;
