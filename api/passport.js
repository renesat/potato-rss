const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const db = require('./common/db');

const passportAuth = async (username, password, done) => {
    return await new db.User({username: username}).fetch({require: false}).then(user => {
        if (!user) {
            return done(null, false, {message: 'Unknown user'});
        }
        if (user.checkPassword(password)) {
            return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
    }).catch(err => {
        return done(err);
    });
};

const bearerAuth = async (accessToken, done) => {
    return await new db.Auth({
        token: accessToken
    }).fetch({require: false, withRelated: ['user']}).then(token => {
        if (!token) {
            return done(null, false);
        }
        if (!token.isLife()) {
            token.destroy();
            return done(null, false, {message: 'Token expired'});
        }
        if (!token.related('user')) {
            return done(null, false, {message: 'Unknown user'});
        }
        const user = token.related('user');
        return done(null, user);
    }).error(err => {
        return done(err);
    });
};

passport.use(new BasicStrategy(
    passportAuth
));

passport.use(new ClientPasswordStrategy(
    passportAuth
));

passport.use(new BearerStrategy(
    bearerAuth
));

module.exports = (api) => {
    api.use(passport.initialize());
};
