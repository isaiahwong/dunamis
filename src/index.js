require('@babel/polyfill');

// Setup Bluebird as the global promise library
global.Promise = require('bluebird');

const path = require('path');
const logger = require('esther');
const pkg = require('../package.json');

const CONTROLLER_PATH = path.join(__dirname, 'controllers/');
const PROTO_PATH = path.join(__dirname, '..', 'proto/health/health.proto');

// load env variables
require('./lib/setupEnv').config();

// initialise logger
logger.init({
  useFileTransport: true,
  disableStackTrace: true,
  logDirectory: path.join(__dirname, '..', 'logs'),
  useStackDriver: process.env.ENABLE_STACKDRIVER === 'true',
  stackDriverOpt: {
    serviceName: 'dunamis',
    ver: pkg.version
  }
});

const Grpc = require('./grpc');

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection at: ${reason} ${reason.stack}`);
  // send entire app down. k8s will restart it
  process.exit(1);
});

const grpc = new Grpc({
  controllerPath: CONTROLLER_PATH,
  protoPath: PROTO_PATH
});
grpc.listen();
