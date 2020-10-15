const BaseController = use('BaseController');
const CateService = use('App/Services/Category');

class NewsController extends BaseController {

  static get inject() {
    return [
      'App/Services/Authentication',
      'App/Services/Category',
    ];
  }

  constructor(Authentication, Category) {
    super();
    this._auth = Authentication;
    this._cateService = Category;
  }

  /**
  * @swagger
  * /v1/news/{slugCate}:
  *   get:
  *     tags:
  *       - News
  *     summary: Get List News
  *     parameters:
  *       - in: path
  *         name: slug
  *         schema:
  *           type: string
  *         required: true
  *         description: slugCate tin tức
  *     responses:
  *       200:
  *         description: lấy chi tiết tin tức bằng slug của category
  *         example:
  *           data: {
                
              }
  */
  async getNewses({ request, response, auth }) {
    // /{slugNews}
  }

  /**
  * @swagger
  * /v1/news/{slugCate}/{slugNews}:
  *   get:
  *     tags:
  *       - News
  *     summary: Get News
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
  async getNews({ request, response, auth }) {
    // /{slugNews}
  }

  /**
  * @swagger
  * /v1/news/hots:
  *   get:
  *     tags:
  *       - News
  *     summary: Get News
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