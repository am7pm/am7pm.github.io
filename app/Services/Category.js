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
};

module.exports = Category;