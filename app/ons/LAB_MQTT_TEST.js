'use strict';

/**
 * rocketmq消息订阅
 */
class MsgSubscriber {
  constructor(app) {
    this.app = app;
  }

  async subscribe(msg) {
    const { ctx } = this;
    // const decodedMsg = ctx.helper.decodeMqMessage(msg);
    console.log(`>>>>>>>>>>>>>>>> msg: ${msg}`);
    ctx.logger.info(`[device-server.subscribe] msgId: ${msg.msgId} data: ${JSON.stringify(msg.data)}`);
    // await ctx.service.task.onTask(decodedMsg, decodedMsg.body);
  }

  static get subExpression() {
    return 'msg';
  }
}

module.exports = MsgSubscriber;
