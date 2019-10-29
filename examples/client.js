const path = require('path');
const logger = require('esther');
const { GrpcClient } = require('grpc-utils');

class HealthService extends GrpcClient {
  constructor() {
    super(
      path.join(__dirname, '..', 'proto', 'health', 'health.proto'),
      {
        serviceURL: 'localhost:50051'
      }
    );
  }
}

const healthService = new HealthService();

healthService.check({ service: 'My Service' })
  .then((res) => {
    logger.info(res);
  });

healthService.validate({})
  .catch((err) => {
    logger.error(err);
  });
