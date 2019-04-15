'use strict';

const path = require('path');

const {
  KEYS,
  ALINODE_APPID,
  ALINODE_SECRET,
  MQ_NAME_SRV,
  MQ_NAME_SPACE,
  MQTT_INSTANCEID,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

exports.logger = {
  dir: '/usr/local/app/logs',
};

exports.alinode = {
  enable: false,
  appid: ALINODE_APPID,
  secret: ALINODE_SECRET,
};

exports.keys = KEYS || 'fjdklfjeiofndasaf-fdkJk';

exports.ons = {
  default: {
    namespace: MQ_NAME_SPACE,
    nameSrv: MQ_NAME_SRV,
  },
  customLogger: {
    onsLogger: {
      consoleLevel: 'INFO',
      file: path.join(exports.logger.dir, 'ons.log'),
    },
  },
};

exports.mqtt = {
  instanceId: MQTT_INSTANCEID,
};

exports.sequelize = {
  host: MYSQL_HOST,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
};
