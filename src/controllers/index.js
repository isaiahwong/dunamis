import logger from 'esther';
import { ok } from '../utils/response';

const api = {};

api.check = {
  handler(call) {
    logger.info(call.request.service);
    return ok({ status: 'SERVING' });
  }
};

api.validate = {
  validate: {
    service: {
      isEmpty: {
        isTruthyError: true,
        errorMessage: 'service cannot be empty'
      }
    },
    address: {
      isIP: {
        errorMessage: 'Invalid IP'
      }
    }
  },
  handler(call) {
    logger.info(call.request.service);
    return ok({ status: 'SERVING' });
  }
};

export default api;
