const intel = require('intel');

function logErrors(err, req, res, next) {
    intel.error(err.message);
    next(err);
}

function defaultErrorHandler(err, req, res, next) {
    res.status(500).json({
        error: 'server_error',
        message: err.message
    });
}

module.exports = {
    logErrors: logErrors,
    defaultErrorHandler: defaultErrorHandler
};
