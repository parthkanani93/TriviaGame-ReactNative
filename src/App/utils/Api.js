import {config} from './config';

const getRequest = async path => {
  try {
    const params = {
      method: 'GET',
    };
    const res = await fetch(config.baseUrl + path, params);
    const data = await res.json();
    return {statusCode: res.status, data};
  } catch (e) {
    console.log(`error in get Request (${path}) :- `, e);
  }
};

export const Api = {
  getRequest,
};
