// const BaseController = use('BaseController');
const CateService = use('App/Services/Category');

class DefaultController {

  static get inject() {
    return [
      'App/Services/Category',
    ];
  }

  constructor(Category) {
    // super();
    this._cateService = Category;
  }

  /**
  * @swagger
  * /v1/default/web-menu-top:
  *   get:
  *     tags:
  *       - Menu
  *     summary: Menu API
  *     responses:
  *       200:
  *         description: Danh sách menu top
  *         example:
  *           data: [{
                id: "5f8163ae12ddb5c3993057b9",
                name: "Bóng Đá Anh",
                slug: "bong-da-anh",
                icon: null,
                metaTags: null
              }]
  */
  async webMenuTop({ request, response }) {
    const cates = await this._cateService.menuTop();

    return response
      .success(cates);
  }
}

module.exports = DefaultController;