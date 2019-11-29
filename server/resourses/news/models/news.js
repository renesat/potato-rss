const db = require('app-root-path').require('/src/common/db');
const validate = require("validate.js");

const newsValidateRule =  {
  username: {
    presence: true,
    exclusion: {
      within: ["nicklas"],
      message: "'%{value}' is not allowed"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
};

var News = db.model('News', {
    tableName: 'NEWS',
    idAttribute: 'NEWS_ID',
    validateRequest: function (req) {
        const data = req.json();

    }
}, {
});
