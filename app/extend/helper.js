'use strict';

const crypto = require('crypto');

const key = '751f621ea5c8f930';
const iv = '2624750004598718';

module.exports = {
  /**
   * 返回客户端的用户名和密码加密
   */
  encrypt(text) {
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    crypted = Buffer.from(crypted, 'hex').toString('base64');
    return crypted;
  },
  /**
   * 解密
   * @param {text}
   */
  decrypt(text) {
    const tb = Buffer.from(text, 'base64').toString('hex');
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decoded = decipher.update(tb, 'hex', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
  },
  /**
   * 从clientId中获取usrName或deviceId
   */
  subString(str) {
    return str.subString(str.indexOf('@') + 3);
  },
  /**
   * 服务中类型定义
   */
  getType() {
    const type = {
      DEVICE_STATUS: {
        ONLINE: 2,
        OFFLINE: 0,
        INIT: 1,
      },
      RES_TASK_STATUS: {
        SUCCESS: 1,
        FAILED: 2,
      },
      WECHAT_USR_TYPE: {
        INIT: 0,
        // 群主号
        OWNER: 1,
        // 客服号
        CUSTOMER_SERVICE: 2,
        // 发单号
        INVOICE: 3,
      },
    };
    return type;
  },
};
