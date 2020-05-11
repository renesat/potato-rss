const db = require('../../common/db');

const getSourcesList = async (user) => {
    return db.Source.getUserSources(
        user.id
    ).then(sourceList => {
        return {
            status: 200,
            data: sourceList
        };
    });
};

const addSource = async (user, data) => {
    return db.Source.createSource(
        user.id,
        data
    ).then(source => {
        db.Source.updateNews(source.id);
        return {
            status: 200,
            data: source
        };
    });
};

const getSource = async (user, id_source) => {
    return await db.Source.getInfo(
        user.id,
        id_source
    ).then(source => {
        return {
            status: 200,
            data: source
        };
    }).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                status: 400,
                data: {
                    error: 'not_found',
                    message: `Not found source ${id_source}`
                }
            };
        } else {
            throw err;
        }
    });
};

const changeSource = (user, id_source, data) => {
    delete data._id;
    delete data.id;
    return db.Source.updateSource(
        user.id,
        id_source,
        data
    ).then(source => {
        return {
            status: 200,
            data: source
        };
    }).catch(err => {
        if (err.message === 'EmptyResponse') {
            return {
                status: 400,
                data: {
                    error: 'not_found',
                    message: `Not found source ${id_source}`
                }
            };
        } else {
            throw err;
        }
    });
};

const deleteSource = (idSource) => {
    return db.Source.deleteSource(
        idSource
    ).then(source => {
        return {
            status: 200,
            data: source
        };
    });
};


module.exports.getSourcesList = getSourcesList;
module.exports.addSource = addSource;
module.exports.getSource = getSource;
module.exports.changeSource = changeSource;
module.exports.deleteSource = deleteSource;
