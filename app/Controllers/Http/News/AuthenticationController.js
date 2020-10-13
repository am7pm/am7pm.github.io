const jwtDecode = use('jwt-decode');
const BaseController = use('BaseController');

class AuthenticationController extends BaseController {

  static get inject() {
    return [
      'App/Services/Authentication',
    ];
  }

  constructor(Authentication) {
    super();
    this._auth = Authentication;
  }

  /**
  * @swagger
  * /v1/auth/guest/token:
  *   get:
  *     tags:
  *       - Token
  *     summary: Get Token Basic
  *     responses:
  *       200:
  *         description: login để lấy token
  *         example:
  *           data: {
                type: "bearer",
                token: "**********************"
              }
  */
  async generateGuestToken({ request, response, auth }) {
    try {
      const token = await this._auth.guestToken(request, auth);
      return response.success(token);
    } catch (error) {
      return response
        .badRequest(null, error.status, error.sqlMessage || error.message);
    }
  }

  /**
  * @swagger
  * /v1/auth/verify-token:
  *   get:
  *     tags:
  *       - Auth
  *     summary: Verify Token
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: login để lấy token
  *         example:
  *           data: {
                
              }
  */
  async verifyToken({ request, response, auth }) {
    try {
      const apiAuth = auth.authenticator('jwt_guest');
      const token = auth.getAuthHeader();
      const tokenPayload = jwtDecode(token);

      return response.success(tokenPayload);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthenticationController;