"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Post extends Model {

  static get table() {
    return "news_posts_crawl";
  }

  static get primaryKey() {
    return 'id'
  }

}

module.exports = Post;
