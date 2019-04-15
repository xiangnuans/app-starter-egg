'use strict';

const path = require('path');

module.exports = (appInfo) => {
  const config = {
    env: appInfo.env,
    name: 'device-server',
    keys: 'my-cookie-secret-key',
    debug: true,
  };
  config.logger = {
    outputJSON: true,
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };
  config.sequelize = {
    host: 'rm-bp171b759ha99x5wfso.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'root',
    password: 'HPGQEhutFBUCi8ZE8JYgWDwZVhAHXWJx',
    database: 'device_server',
    dialect: 'mysql',
    operatorsAliases: false,
    timezone: '+08:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 1000,
      connectionLimit: 10,
      dateStrings: true,
    },
  };
  config.ons = {
    default: {
      nameSrv: 'MQ_INST_29772019_BagzDII4.mq-internet-access.mq-internet.aliyuncs.com:80',
      accessKey: 'LTAITwRV1Y07wisB',
      secretKey: 'RR7zdz6iooUpMdJInAWPstkHsKNwMu',
    },
    sub: [
      {
        consumerGroup: 'MQ_INST_29772019_BagzDII4%GID_TEST',
        topics: [
          'MQ_INST_29772019_BagzDII4%LAB_MQTT_TEST',
        ],
      },
      {
        consumerGroup: 'MQ_INST_29772019_BagzDII4%GID_CID_UP_DEV',
        topics: [
          'MQ_INST_29772019_BagzDII4%CRM_TASK_SEND_MSG',
        ],
      },
      {
        consumerGroup: 'MQ_INST_29772019_BagzDII4%GID_CID_DOWN_DEV',
        topics: [
          'MQ_INST_29772019_BagzDII4%GID_ONLINE_MQTT',
        ],
      },
    ],
    pub: [
      {
        producerGroup: 'MQ_INST_29772019_BagzDII4%GID_PID_UP_DEV',
        topics: [
          'MQ_INST_29772019_BagzDII4%CRM_TASK_SEND_MSG',
        ],
      },
      {
        producerGroup: 'MQ_INST_29772019_BagzDII4%GID_PID_DOWN_DEV',
        topics: [
          'MQ_INST_29772019_BagzDII4%CRM_MQTT_CLIENT_MSG',
        ],
      },
    ],
    customerLogger: {
      onsLogger: {
        consoleLevel: 'DEBUG',
        file: path.join(appInfo.root, 'logs', appInfo.name, 'ons.log'),
      },
    }
  };
  config.mqtt = {
    accessKey: 'LTAITwRV1Y07wisB',
    secretKey: 'RR7zdz6iooUpMdJInAWPstkHsKNwMu',
    instanceId: 'post-cn-v0h128nqh0d',
    clientGroup: 'GID_ONLINE',
  };
  config.redis = {
    // eslint-disable-next-line global-require
    Redis: require('ioredis'),
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  config.middleware = ['auth', 'responseFormat'];
  config.bodyParser = {
    enableTypes: ['json', 'form'],
    formLimit: '2mb',
    jsonLimit: '3mb',
  };
  config.joi = {
    options: {},
    locale: {
      'zh-cn': {},
    },
    // 校验出错时是否自动抛出错误
    throw: true,
    // throw为true时对抛出的错误做格式化处理
    throwHandle: (error) => error,
    // throw为false时错误会作为结果返回， 默认{error, value}，此函数可以对错误做格式化
    errorHandle: (error) => error,
    // 对返回结果做处理的函数，默认返回结果{ error, value }
    resultHandle: (result) => result,
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};
