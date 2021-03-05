import config from './config';

const bundleb2bApi = config.bundleb2bApi;

export const checkoutB2bUser = (query) => $.ajax({ url: `${bundleb2bApi}/api/v2/users/validations/existence`, method: 'GET', data: query });
