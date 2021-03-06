import dotenv from 'dotenv';
import confidence from 'confidence';

dotenv.config();

const config = {
  port: process.env.PORT,
  mongo: process.env.MONGO_URI,
  basicAuth: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  secretKey: process.env.SECRET_KEY,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  redis: process.env.REDIS_URL
};

const globalEnv = new confidence.Store(config);

exports.default = (key: any) => globalEnv.get(key);

export default globalEnv;
