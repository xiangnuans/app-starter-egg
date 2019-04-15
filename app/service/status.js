'use strict';

const { Service } = require('egg');
const hmacsha1 = require('hmacsha1');

class StatusService extends Service {
  async checkMysql() {
    const { ctx } = this;
    const SQL_CHECK = 'show tables;';
    const data = await ctx.model.query(SQL_CHECK);
    return data;
  }

  /**
   * 获取用户名和密码
   */
  async getKey() {
    try {
      const { ctx } = this;
      const { mqtt } = this.config;
      const { deviceId, deviceAlias, usrName } = ctx.query;
      if (usrName) {
        await ctx.model.Device.update({ usrName }, { where: { deviceId } });
      } else {
        const dev = await ctx.model.Device.findOne({ where: { deviceId, deviceAlias }, raw: true });
        if (dev) {
          ctx.logger.warn('【service.status】找不到该设备信息，请检查web设备管理，是否有该设备信息');
          throw new Error('【service.status】找不到该设备信息，请检查web设备管理，是否有该设备信息');
        }
      }
      const userName = `Signature|${mqtt.accessKey}|${mqtt.instanceId}`;
      const param = usrName || deviceId;
      const clientId = `${mqtt.clientGroup}@@@${param}`;
      const password = hmacsha1(mqtt.secretKey, clientId);
      const user = ctx.helper.encrypt(userName);
      const pw = ctx.helper.encrypt(password);
      return {
        userName: user,
        password: pw,
      };
    } catch (e) {
      this.logger.warn('【service.status】获取客户端失败', JSON.stringify(e));
      throw new Error(e);
    }
  }
}

module.exports = StatusService;
