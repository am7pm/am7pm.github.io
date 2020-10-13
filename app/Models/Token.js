'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {
  data = null;
  token = null;
  expire = null;
  isActive = true;

  static get table() {
    return 'tokens';
  }

  static get primaryKey() {
    return 'id'
  }

  static async create(payload, trx) {
    const schema = Token.schema;
    Object.keys(schema).map(key => {
      if (key in payload) {
        schema[key] = payload[key];
      }
    });
    return await super.create(payload, trx);
  }

  /**
   * User's schema
   */
  static get schema() {
    return {
      data: {},
      token: null,
      expire: new Date(),
      isActive: true,
    }
  }
}

module.exports = Token
