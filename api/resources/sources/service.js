const db = require('../../common/db');

const getSourcesList = async (user) => {
    return db.Source.getUserSources(
        user.id
    ).catch (err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const addSource = async (user, data) => {
    return db.Source.createSource(
        user.id,
        data
    ).catch(err => {
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const getSource = async (user, id_source) => {
    return db.Source.getInfo(
        user.id,
        id_source
    ).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                error: 'not_found',
                message: `Not found source ${id_source}`
            };
        }
        return {
            error: 'server_error',
            message: err.message
        };
    });
};

const changeSource = (user, id_source, data) => {
    delete data._id;
    delete data.id;
    return db.Source.updateSource(
        user.id,
        id_source,
        data
    ).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                error: 'not_found',
                message: `Not found source ${id_source}`
            };
        }
        return {
            error: 'server_error',
            message: err.message
        };
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
