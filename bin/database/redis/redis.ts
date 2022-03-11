import * as getConnection from './connect';
import wrapper from '../../../utils/wrapper';

import { code } from '../../../utils/commons';

export default class Redis {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  async setExpire(key: any, value: any, expireType: any, expire: any) {
    let client = await getConnection.myPool().acquire();
    client.on('error', (err: any) => {
      return wrapper.error(`Fail to set redis data, ${err}`, code.INTERNAL_ERROR);
    });

    client.set(key, JSON.stringify(value), expireType, expire);
    return wrapper.data('OK', 'Successfully set redis data');
  }

  async get(key: any) {
    let client = await getConnection.myPool().acquire();
    client.on('error', (err: any) => {
      if (err === 'ECONNREFUSED') {
        return wrapper.error(`Fail to get redis data, ${err}`, code.INTERNAL_ERROR);
      }
      return wrapper.error(`Fail to get redis data, ${err}`, code.INTERNAL_ERROR);
    });
    return new Promise(((resolve, reject) => {
      client.get(key, (err: any, replies: any) => {
        if (err !== null) {
          reject(wrapper.error(`Data not found, ${err}`, code.NOT_FOUND));
        }
        resolve(wrapper.data(replies, 'OK'));
      });
    }));
  }

  async del(key: any) {
    let client = await getConnection.myPool().acquire();
    client.on('error', (err: any) => {
      return wrapper.error(`Fail to set redis data, ${err}`, code.INTERNAL_ERROR);
    });
    client.del(key);
    return wrapper.data('OK', 'Success deleting redis data');
  }

  async incr(key: any) {
    let client = await getConnection.myPool().acquire();
    client.on('error', (err: any) => {
      if (err === 'ECONNREFUSED') {
        return wrapper.error(`Fail to increment redis data, ${err}`, code.INTERNAL_ERROR);
      }
      return wrapper.error(`Fail to increment redis data, ${err}`, code.INTERNAL_ERROR);
    });
    return new Promise(((resolve, reject) => {
      client.incr(key, (err: any, replies: any) => {
        if (err !== null) {
          reject(wrapper.error(`Fail to increment redis data, ${err}`, code.INTERNAL_ERROR));
        }
        resolve(wrapper.data(replies, 'OK'));
      });
    }));
  }
}