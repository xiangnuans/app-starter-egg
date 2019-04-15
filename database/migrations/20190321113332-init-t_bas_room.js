'use strict';

const TIMESTAMP = require('sequelize-mysql-timestamp')(this.app.sequelize);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('t_bas_rooms', {
    usrName: {
      type: Sequelize.STRING(50), allowNull: false, defaultValue: '', field: 'usr_name',
    },
    roomId: {
      type: Sequelize.STRING(50), allowNull: false, defaultValue: '', field: 'room_id',
    },
    nickName: {
      type: Sequelize.STRING(255), allowNull: false, defaultValue: '', field: 'nick_name',
    },
    owner: {
      type: Sequelize.STRING(50), allowNull: false, defaultValue: '', field: 'owner',
    },
    adminList: {
      type: Sequelize.STRING(255), allowNull: false, defaultValue: '', field: 'admin_list',
    },
    maxMemberCount: {
      type: Sequelize.INTEGER(5), allowNull: false, defaultValue: 500, field: 'max_member_count',
    },
    headImgUrl: {
      type: Sequelize.STRING(255), allowNull: false, defaultValue: '', field: 'head_img_url',
    },
    headHDImgUrl: {
      type: Sequelize.STRING(255), allowNull: false, defaultValue: '', field: 'head_hd_img_url',
    },
    createTime: {
      type: TIMESTAMP, allowNull: false, field: 'create_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), order: 'DESC',
    },
    updateTime: {
      type: TIMESTAMP, allowNull: false, field: 'update_time', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    creator: {
      type: Sequelize.STRING(50), allowNull: false, field: 'creator', defaultValue: '',
    },
    reviser: {
      type: Sequelize.STRING(50), allowNull: false, field: 'reviser', defaultValue: '',
    },
  }).then(() => queryInterface.addConstraint('Item', ['usr_name', 'room_id'], {
    type: 'unique',
    name: 'unique_wechat_romm',
  })),

  down: (queryInterface) => queryInterface.dropTable('t_bas_room'),
};
