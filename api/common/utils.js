const fs = require('fs');
const toml = require('toml');

const loadConfig = path => {
    return toml.parse(fs.readFileSync(path, 'utf-8'));
};
module.exports = {
    loadConfig: loadConfig
};
