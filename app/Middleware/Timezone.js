const Env = use('Env')

class Timezone {
  async handle({ timezone }, next) {
    timezone.activate(Env.TZ);
    await next();
  }
}

module.exports = Timezone;