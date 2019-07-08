import path from 'path';
import logger from 'esther';
import { GrpcClient } from 'grpc-utils';

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
