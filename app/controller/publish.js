'use strict';

const { Controller } = require('egg');

class PublishController extends Controller {
  async test() {
    const { ctx } = this;
    const res = await ctx.service.test();
    ctx.body = res;
  }
};

module.exports = PublishController;
