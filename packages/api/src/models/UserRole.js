const { Model } = require("objection");

class UserRole extends Model {
  static get tableName() {
    return "user_role";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = UserRole;
