'use strict';

const { Service } = require('egg');

class PublishService extends Service {
  async test() {
    const { ctx } = this;
    const { msg } = ctx.request.body;
    const { Message } = ctx.ons;
    try {
      const jsonStr = JSON.stringify(msg);
      ctx.logger.info('[service.publish.test]', `publish msg `, jsonStr);
      const msg2device = new Message('LAB_MQTT_TEST', '*', jsonStr);
      msg2device.properties.mqttSecondTopic = `/p2p/${app.config.mqtt.clientGroup}@@@001`;
      // 保持所有下发的消息设备都有接收到
      msg2device.properties.qoslevel = 2;
      const { sendStatus, msgId } = await ctx.ons.send(msg2device);
      if (sendStatus === 'SEND_OK') {
        return msgId;
      }
      ctx.logger.info('[service.publish.test] : publish message ', msgId, jsonStr);
    } catch (e) {
      throw new Error(e, `发布消息失败失败`);
    }
  }
}