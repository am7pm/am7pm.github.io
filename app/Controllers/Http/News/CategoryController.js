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
    const cates = await this._cateService.getSlug(filters, {});

    return response
      .success(cates);
  }
}

module.exports = CategoryController;