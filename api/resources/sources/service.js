const db = require('../../common/db');

const prepareSource = async (source) => {
    return source.toJSON();
};

const getSourcesList = async (user) => {
    let sources = await db.Source.getUserSources(
        user.id
    );
    await sources.map(prepareSource);
    return sources;
};

const addSource = async (user, data) => {
    let source = await db.Source.createSource(
        user.id,
        data
    );
    source = await prepareSource(source);
    return source;
};

const getSource = async (user, id_source) => {
    let source = await db.Source.getInfo(
        user.id,
        id_source
    );
    source = await prepareSource(source);
    return source;
};

const changeSource = async (user, id_source, data) => {
    let source = await db.Source.updateSource(
        user.id,
        id_source,
        data
    );
    source = await prepareSource(source);
    return source;
};

const deleteSource = async (user, sourceID) => {
    let source = await db.Source.getInfo(
        user.id,
        sourceID
    );
    let deleted_source =  prepareSource(source);
    source.destroy();
    return deleted_source;
};

module.exports.getSourcesList = getSourcesList;
module.exports.addSource = addSource;
module.exports.getSource = getSource;
module.exports.changeSource = changeSource;
module.exports.deleteSource = deleteSource;
