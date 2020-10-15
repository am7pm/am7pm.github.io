const BaseController = use('BaseController');
const CateService = use('App/Services/Category');

class CategoryController extends BaseController {

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

  async list({ request, response }) {
    const cates = await this._cateService.getList();

    return response
      .success(cates);
  }

  /**
  * @swagger
  * /v1/categories/slug/{slug}:
  *   get:
  *     tags:
  *       - Category
  *     summary: Get Category
  *     parameters:
  *       - in: path
  *         name: slug
  *         schema:
  *           type: string
  *         required: true
  *         description: slug category
  *     responses:
  *       200:
  *         description: lấy category bằng slug
  *         example:
  *           data: {
                
              }
  */
  async getCateBySlug({ request, response, auth }) {
    let filters = request.params;
    const token = auth.getAuthHeader();
    const cates = await this._cateService.getSlug(filters);

    return response
      .success(cates);
  }

  /**
  * @swagger
  * /v1/categories/id/{cateId}:
  *   get:
  *     tags:
  *       - Category
  *     summary: Get Category
  *     parameters:
  *       - in: path
  *         name: cateId
  *         schema:
  *           type: string
  *         required: true
  *         description: cateId category
  *     responses:
  *       200:
  *         description: lấy category bằng id
  *         example:
  *           data: {
                
              }
  */
  async getCateById({ request, response, auth }) {
    const filters = request.params;
    const authInfo = this._auth.getUserInfo(auth);
    const cates = await this._cateService.getId(filters, authInfo);

    return response
      .success(cates);
  }
}

module.exports = CategoryController;