const intel = require('intel');

class RequestError extends Error {
    constructor(code, message, status=400) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error()).stack;
        }
        this.name = this.constructor.name;
        this.code = code;
        this.status = status;
    }
}

class NotFoundPropertyError extends RequestError {
    constructor(property, value, status=400) {
        super(
            'NOT_FOUND_PROPERTY',
            `Not found '${property}' = '${value}'`,
            status
        );
    }
}

class UserExistsError extends RequestError {
    constructor(status=400) {
        super(
            'USER_ALREADY_EXISTS',
            'User already exists',
            status
        );
    }
}

class EmailExistsError extends RequestError {
    constructor(status=400) {
        super(
            'EMAIL_ALREADY_EXISTS',
            'Email already exists',
            status
        );
    }
}

class PropertyExistsError extends RequestError {
    constructor(property, value, status=400) {
        super(
            'PROPERTY_EXISTS',
            `'${property}' = '${value} exist'`,
            status
        );
    }
}


function requestErrorHandler(err, req, res, next) {
    if (err instanceof RequestError) {
        res.status(err.status).json({
            error: err.code,
            message: err.message
        });
    } else {
        next(err);
    }
}


function defaultErrorHandler(err, req, res, next) {
    res.status(500).json({
        error: 'SERVER_ERROR',
        message: err.message
    });
    next(err);
}

function logErrorHandler(err, req, res, next) {
    intel.error(err.stack);
}

function errorWrapper(routerFun) {
    return (req, res, next) => {
        routerFun(req, res, next)
            .catch(err => {
                next(err);
            });
    };
}

module.exports = {
    logErrorHandler: logErrorHandler,
    requestErrorHandler: requestErrorHandler,
    defaultErrorHandler: defaultErrorHandler,
    errorWrapper: errorWrapper,

    RequestError: RequestError,
    NotFoundPropertyError: NotFoundPropertyError,
    UserExistsError: UserExistsError,
    EmailExistsError: EmailExistsError,
    PropertyExistsError: PropertyExistsError,
};
