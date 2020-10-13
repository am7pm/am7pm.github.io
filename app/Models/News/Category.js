'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

  static get table() {
    return 'news_categories';
  }

  static getRules() {
    return this.rules;
  }

  static get primaryKey() {
    return 'id'
  }

  /**
   * Validator rules
   * @type {Object}
   */
  static get rules () {
    return {
      name: 'string|required|max:255',
      slug: 'string|required|max:300',
      status: 'integer|required|max:1',
      isShow: 'integer|required|max:1'
    }
  }

}

module.exports = Category
