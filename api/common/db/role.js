const {db} = require('./base');

const Role = db.model(
    'Role',
    {
        tableName: 'roles',
        users() {
            return this.hasMany('User');
        }
    },
    {
        getRoleID(name) {
            return new Role({name: name}).fetch().then(role => {
                return role.id;
            });
        }
    }
);

module.exports.Role = Role;
