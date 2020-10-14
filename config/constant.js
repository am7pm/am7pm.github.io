const Env = use('Env')

module.exports = {
  env: Env.get('NODE_ENV', 'development'),
  ipDemo: '118.69.34.88',
  USER_TYPE: {
    GUEST: 'guest',
    USER: 'user',
    ADMIN: 'admin'
  }
};