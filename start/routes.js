'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const version1 = 'v1';

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});

Route.group(() => {
  // Token
  Route.get(`/auth/guest/token`, 'News/AuthenticationController.generateGuestToken');

  // Menu
  Route.get(`/default/web-menu-top`, 'News/DefaultController.webMenuTop');

  // Frontend
  Route.get(`/categories`, 'News/CategoryController.list');
  Route.get(`/categories/slug/:slug`, 'News/CategoryController.getCateBySlug');
})
  .prefix(`${version1}`);

Route.group(() => {
  // Auth
  Route.get(`/auth/verify-token`, 'News/AuthenticationController.verifyToken');
})
  .prefix(`${version1}`)
  .middleware('auth:jwt_guest');
