'use strict'

const Env = use('Env');
const Database = use('Database');
const jwtDecode = use('jwt-decode');
const Format = use('App/Helpers/Format');
const Config = use('Config').get('constant');

class Authentication {

  static get inject() {
    return [
      'App/Models/Token',
      'App/Helpers/Util',
      'App/Schema/GuestSchema',
      'App/Schema/UserSchema',
    ];
  }

  constructor(Token, Util, GuestSchema, UserSchema) {
    this._token = Token;
    this._guest = GuestSchema;
    this._util = Util;
    this._axios = require('axios');
  }

  async guestToken(request, auth, data = { lat: '', long: '' }) {
    const resultIP = await this.getIpInfo(request);
    const now = new Date();
    const dataGuest = {
      ...this._guest,
      id: String(this._util.generateObjID()),
      timezone: now.getTimezoneOffset()/60 * (-1),
      ...resultIP,
    };
    now.setHours(now.getHours() + 3);
    const apiAuth = auth.authenticator('jwt_guest');
    try {
      const token = await apiAuth.generate(dataGuest, dataGuest);
      if (token) {
        const dataToken = {
          id: dataGuest.id,
          data: JSON.stringify(dataGuest),
          token: token['token'],
          expire: Format.getDateTimeLocaleString(now),
          isActive: true,
          userType: Config.USER_TYPE.GUEST,
        }

        // await this._token.create(dataToken);
        const result = await Database
          .table('tokens')
          .insert(dataToken);
      }
      return token;
    } catch (error) {
      throw error;
    }
  }

  async userToken(auth) {

  }

  async getIpInfo(request) {
    let hostIP = Env.get('HOST_IP');
    let ip = null;
    if (Config.env == 'production') {
      ip = request.ip();
    } else {
      ip = Config.ipDemo;
    }
    let result = {};
    try {
      const resIp = await this._axios.get(hostIP.replace('{ip}', ip));
      result = {
        lat: resIp.data.lat,
        long: resIp.data.lon,
        location: resIp.data.timezone
      };
      return result;
    } catch (error) {
      return {};
    }
  }

  async getUserInfo(auth) {
    const token = auth.getAuthHeader();
    if (token) {
      try {
        const tokenPayload = jwtDecode(token);
        if (tokenPayload && tokenPayload.data) {
          const { data: userType } = tokenPayload;
          // switch (userType) {
          //   case Config.
          // }
          return {...this._guest, ...tokenPayload.data}
        }
      } catch (error) {

      }
    }
    return this._guest;
  }

};

module.exports = Authentication;