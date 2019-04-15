'use strict';

const axios = require('axios');

module.exports = () => async (ctx, next) => {
  if (process.env.USER_AUTH !== 'production') {
    // 开发环境先写死userid
    ctx.state.userId = 1;
  } else {
    const sessionId = ctx.cookies.get('WD_SID');
    if (!sessionId) {
      // cookie过期
      ctx.body = {
        code: 403,
        message: 'no cookie WD_SID',
        data: 'https://login.weidiango.com',
      };
      return;
    }

    try {
      const { data } = await axios.get(`https://index.weidiango.com/login/touch?sessionId=${sessionId}`);

      // 服务器session过期
      if (!data || !data.data) {
        ctx.body = {
          code: 403,
          message: 'no session',
          data: 'https://login.weidiango.com',
        };
        return;
      }

      ctx.state.userId = data.data.cms.id;
    } catch (e) {
      ctx.body = {
        code: 500,
        message: `request auth data fail ${e.message}`,
        data: null,
      };
      return;
    }
  }
  await next();
};
