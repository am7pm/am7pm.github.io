'use strict'

// const Hashids = require('hashids/cjs');
const ObjectID = use("bson-objectid");
const Constant = use('Config').get('constant');
// const Format = use('App/Helpers/Format');
const fs = require("fs");

class Util {

  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  generateObjID() {
    return ObjectID();
  }

  // data(metaCols, input) {
  //     let data = {};
  //     Object.keys(metaCols).forEach(key => {
  //         if (key in input)
  //             data[key] = input[key];
  //     });
  //     return data;
  // }

  // removeHostImage(field) {
  //     let path = '';
  //     if (field.search(Constant.configPath.hostName) > 0) {
  //         path = field.split(Constant.configPath.url)[1];
  //     }
  //     return path;
  // }

  // mapImageData(data = [], field = {}) {
  //     let arr = [];
  //     data.forEach((item, key) => {
  //         if (item) {
  //             field['product_img_path'] = this.removeHostImage(item);
  //             field['order'] = key + 1;
  //             arr.push(field);
  //         }
  //     });
  //     return arr;
  // }

  // async writeFile(file) {

  //     const hashids = new Hashids((new Date()).toUTCString(), 5);
  //     const generateCode = hashids.encode(1, 2);

  //     // const arrFile = file.clientName.split(`.${file.extname}`);
  //     const time = Format.getDateTime(new Date(), 'y-m-d');
  //     const fileName = `${time.replace(/[:\\\- ]/g, '')}-${generateCode}.${file.extname}`;

  //     // check exist folder
  //     if (!fs.existsSync(Constant.configPath.saveImage + Constant.configPath.subFolder)) {
  //         await fs.mkdirSync(Constant.configPath.saveImage + Constant.configPath.subFolder, { recursive: true });
  //     }

  //     // move file image from folder
  //     await file.move(Constant.configPath.saveImage + Constant.configPath.subFolder, {
  //         name: fileName,
  //         overwrite: true
  //     })

  //     if (!file.moved()) {
  //         return file.error();
  //     }
  //     return `${Constant.configPath.rootFolder}${Constant.configPath.subFolder}${fileName}`;
  // }
}

module.exports = Util;
