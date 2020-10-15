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

  // Category
  Route.get(`/categories`, 'News/CategoryController.list');
  Route.get(`/categories/slug/:slug`, 'News/CategoryController.getCateBySlug');
  Route.get(`/categories/id/:cateId`, 'News/CategoryController.getCateById');
})
  .prefix(`${version1}`);

Route.group(() => {
  // Auth
  Route.get(`/auth/verify-token`, 'News/AuthenticationController.verifyToken');

  // News
  Route.get(`/news/:slugCate`, 'News/NewsController.getNewses');
  Route.get(`/news/:slugCate/:slugNews`, 'News/NewsController.getNews');
  Route.get(`/news/hot`, 'News/NewsController.getNewsesHot');
})
  .prefix(`${version1}`)
  .middleware('auth:jwt_guest');
