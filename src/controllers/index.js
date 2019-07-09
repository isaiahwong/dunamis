import logger from 'esther';
import { BadRequest } from 'horeb';
import { encodeArrayMetadata } from 'grpc-utils';
import { check } from '../utils/validator';

const api = {};

api.check = function handler(call, callback) {
  logger.info(call.request.service);
  callback(null, { status: 'SERVING' });
};

api.validate = function handler(call, callback) {
  const errors = check(call.request, {
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
  });
  if (errors) {
    const err = new BadRequest('invalidParams');
    const metadata = encodeArrayMetadata('errors', errors);
    err.metadata = metadata;
    return callback(err);
  }
  return callback(null, { status: 'SERVING' });
};

export default api;
