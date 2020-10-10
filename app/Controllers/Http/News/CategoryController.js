// const BaseController = use('BaseController');
const CateService = use('App/Services/Category');

class CategoryController { // extends BaseController {

    static get inject() {
        return [
            'App/Services/Category',
        ];
    }

    constructor(Category) {
        this._cateService = Category;
    }

  async list({ request, response }) {
    const cates = await this._cateService.getList();

    return response
      .success(cates);
  }
}

module.exports = CategoryController;