
class Post {

  static get inject() {
    return [
      'App/Models/News/Post',
    ];
  }

  constructor(Post) {
    this._post = Post;
  }

  async getPostsByCateId(filter = {}, auth = {}) {
    if (filter.cateId) {
      const posts = this._post.query()
        .select('id', 'slug', 'title', 'main_image', 'sourceName', 'language', 'type', 'metaTags')
        .where('categoryId', filter.cateId)
        .offset(parseInt(filter.offset))
        .limit(parseInt(filter.limit))
        .orderBy('createdAt', 'desc')
        .fetch();

      return posts;
    }

    return [];
  }

  async getPostBySlug(filter = {}, auth = {}) {
    if (filter.slug) {
      const post = this._post.query()
        .select('id', 'slug', 'title', 'main_image', 'sourceName', 'language', 'type', 'metaTags')
        .findBy('slug', filter.slug);

      return post;
    }

    return {};
  }

  async getPostById(filter = {}, auth = {}) {
    if (filter.id) {
      const post = this._post.query()
        .select('id', 'slug', 'title', 'main_image', 'sourceName', 'language', 'type', 'metaTags')
        .find(filter.id);

      return post;
    }

    return {};
  }
};

module.exports = Post;