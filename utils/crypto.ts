import crypto from 'crypto';
import globalEnv from '../bin/config/globalEnv';

const encrypt = async (payload: any) => {
  let cipher = crypto.createCipher('aes-256-cbc', globalEnv.get('/secretKey'));
  let encrypted = cipher.update(payload, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted.toString();
};

const decrypt = async (payload: any) => {
  let cipher = crypto.createDecipher('aes-256-cbc', globalEnv.get('/secretKey'));
  let encrypted = cipher.update(payload, 'hex', 'utf8');
  encrypted += cipher.final('utf8');
  return encrypted.toString();
};

export default {
  encrypt,
  decrypt
};
