import { REQUEST_PIN } from '../login/mutations';

// Pass in true or false for isExistingUser
export const REQUST_PIN_MOCKS = (existing) => ({
  request: {
    query: REQUEST_PIN,
  },
  result: {
    data: {
      requestSmsLoginPin: {
        success: true,
        isExistingIdentity: existing,
      },
    },
  },
});
