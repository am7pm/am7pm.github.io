const BaseController = use('BaseController');

class NewsController extends BaseController {

  static get inject() {
    return [
      'App/Services/Authentication',
      'App/Services/Category',
      'App/Services/Post',
    ];
  }

  constructor(Authentication, Category, Post) {
    super();
    this._auth = Authentication;
    this._cateService = Category;
    this._postService = Post;
  }

  /**
  * @swagger
  * /v1/news/{slugCate}:
  *   get:
  *     tags:
  *       - News
  *     summary: Get List News
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: slugCate
  *         schema:
  *           type: string
  *         required: true
  *         description: slugCate tin tức
  *       - in: query
  *         name: offset
  *         type: integer
  *         description: The number of items to skip before starting to collect the result set.
  *       - in: query
  *         name: limit
  *         type: integer
  *     responses:
  *       200:
  *         description: lấy chi tiết tin tức bằng slug của category
  *         example:
  *           data: [{
                "id": "5f7e8a7f0c59480edc02a42b",
                "slug": "arteta-gay-soc-mesut-ozil-coi-nhu-het-duong-song-tai-arsenal",
                "title": null,
                "main_image": null,
                "sourceName": "Bongda.com.vn",
                "language": "vi",
                "type": null,
                "metaTags": null
              }]
  */
  async getNewses({ request, response, auth }) {
    const { slugCate } = request.params;
    const { offset, limit } = request.all();

    const authInfo = this._auth.getUserInfo(auth);
    const cate = await this._cateService.getSlug({ slug: slugCate });
    if (cate) {
      let filter = {
        cateId: cate.id,
        offset: offset || 0,
        limit: limit || 10
      }
      const posts = await this._postService.getPostsByCateId(filter);
      return response.success(posts);
    }

    return response
      .success([]);
  }

  /**
  * @swagger
  * /v1/news/{slugCate}/{slugNews}:
  *   get:
  *     tags:
  *       - News
  *     summary: Get News
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: path
  *         name: slug
  *         schema:
  *           type: string
  *         required: true
  *         description: slug news
  *     responses:
  *       200:
  *         description: lấy chi tiết tin tức bằng slug của bài viết
  *         example:
  *           data: {
                
              }
  */
  async getNewsBySlug({ request, response, auth }) {
    const { slugCate, slugNews } = request.params;
    const { offset, limit } = request.all();

    const authInfo = this._auth.getUserInfo(auth);
    const cate = await this._cateService.getSlug({ slug: slugCate });
    if (cate) {
      let filter = {
        slug: slugNews,
      }
      const post = this._postService.getPostBySlug(filter);
      return response.success(post);
    } else {
      return response
        .notFound(null, { message: 'Không tồn tại danh mục', code: 404 });
    }

    return response
      .success([]);
  }

  /**
  * @swagger
  * /v1/news/hots:
  *   get:
  *     tags:
  *       - News
  *     summary: Get List News Hot
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: lấy danh sách bài viết hot
  *         example:
  *           data: {
                
              }
  */
  async getNewsesHot({ request, response, auth }) {
    //
  }


  async getNewsBySearch({ request, response, auth }) {
    //
  }

};

module.exports = NewsController;