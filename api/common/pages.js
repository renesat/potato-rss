const notFoundPage =  (page) => {
    return JSON.stringify({
        error: 'not found',
        messege: `This page not found: ${page}`
    });
};


module.exports.notFoundPage = notFoundPage;
