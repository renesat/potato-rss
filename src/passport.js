passport = require('passport');

module.exports = (api) => {
  api.use(passport.initialize());
  api.use(passport.session());
};
