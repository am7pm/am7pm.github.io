const Categories = use('App/Models/News/Category');
// const Database = use('Database');

class Category {

  async list(filter = {}) {
    const cates = await Categories
      .query()
      // .where('isShow', 1)
      .limit(10)
      .fetch();

    // const news = await Database
    //     .connection('mysql', { mode: 'write' })
    //     .from('news_posts_crawl')
    //     .where('isShow', 1)
    //     .from('news_posts_crawl')
    //     .select('*')
    //     .limit(10);

    return cates;
  }

  async menuTop(filter = {}) {
    const cates = await Categories
      .query()
      .select('id', 'name', 'slug', 'icon', 'metaTags')
      .where('isShow', 1)
      .where('top', 1)
      .orderBy('sort_order', 'asc')
      .limit(10)
      .fetch();

    return cates;
  }

  async getSlug(filter = {}, auth = {}) {
    if (filter.slug) {
      const cate = await Categories
        .findBy('slug', filter.slug);

      return cate;
    }

    return {};
  }

  async getId(filter = {}, auth = {}) {
    if (filter.cateId) {
      const cate = await Categories
        .findBy('id', filter.cateId);

      return cate;
    }

    return {};
  }
};

module.exports = Category;