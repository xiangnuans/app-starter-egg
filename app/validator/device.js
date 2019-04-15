'use strict';

module.exports = (app) => {
  const { Joi } = app;
  return {
    getKey: Joi.object().keys({
      deviceId: Joi.string().required(),
      deviceAlias: Joi.string().required(),
    }),
    loginSet: Joi.object().keys({
      deviceAlias: Joi.string().required(),
    }),
    updateDevice: Joi.object().keys({
      deviceId: Joi.string().required(),
      deviceAlias: Joi.string().required(),
      usrName: Joi.string().required(),
      nickName: Joi.string().required(),
    }),
    getClientStatus: Joi.object().keys({
      pageIndex: Joi.number().required(),
      pageSize: Joi.number().required(),
    }),
    createDevices: Joi.array().items(
      Joi.object().keys({
        deviceAlias: Joi.string().required(),
        loginName: Joi.string().required(),
        loginPassword: Joi.string().required(),
        usrType: Joi.number().required(),
        loginType: Joi.number().required(),
      }),
    ),
    getClient: Joi.object().keys({
      deviceAlias: Joi.string().required(),
    }),
  };
};
