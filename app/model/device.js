'use strict';

const seqluelizeTime = require('sequelize-mysql-timestamp');

module.exports = (app) => {
  const TIMESTAMP = seqluelizeTime(app.model);
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Device = app.model.define('t_bas_device', {
    id: {
      type: INTEGER(11).UNSIGNED, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    deviceId: {
      type: STRING(255), unique: true, allowNull: false, defaultValue: '', field: 'device_id',
    },
    deviceAlias: {
      type: STRING(255), unique: true, allowNull: false, defaultValue: '', field: 'device_alias',
    },
    usrName: {
      type: STRING(50), allowNull: false, defaultValue: '', field: 'usr_name',
    },
    nickName: {
      type: STRING(255), allowNull: false, defaultValue: '', field: 'nick_name',
    },
    usrType: {
      type: INTEGER(3), allowNull: false, defaultValue: 0, field: 'usr_type',
    },
    loginType: {
      type: INTEGER(2), allowNull: false, defaultValue: 1, field: 'login_type',
    },
    loginName: {
      type: STRING(255), allowNull: false, defaultValue: '', field: 'login_name',
    },
    loginPassword: {
      type: STRING(255), allowNull: false, defaultValue: '', field: 'login_password',
    },
    loginSign: {
      type: TEXT, allowNull: false, defaultValue: '', field: 'login_sign',
    },
    status: {
      type: INTEGER(2), allowNull: false, defaultValue: 1, field: 'status',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'), order: 'DESC',
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    creator: {
      type: STRING(50), allowNull: false, field: 'creator', defaultValue: '',
    },
    reviser: {
      type: STRING(50), allowNull: false, field: 'reviser', defaultValue: '',
    },
  },
  {
    timestamps: false,
  });

  return Device;
};
