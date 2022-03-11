import mongoose from 'mongoose';
import validate from 'validate.js';
import logger from '../../../utils/logger';
import wrapper from '../../../utils/wrapper';
import { code } from '../../../utils/commons';

export default class DB {

  private readonly scope = 'DB';

  private async DBInstance(config: String) {
    const cx = 'DB-instance';
    if (!config) {
      logger.error(cx, 'Database uri is invalid!', this.scope);
      return wrapper.error('Database uri is invalid!', code.INTERNAL_ERROR);
    }

    const options: Object = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      socketTimeoutMS: 15000,
      connectTimeoutMS: 15000
    }

    return wrapper.data({ db: config, options }, '');
  }


  public async init() {
    const cx = 'DB-init';

    try {
      const instance = await this.DBInstance(process.env.MONGO || 'mongodb://localhost:27017/oop-ts-rest');
      if (!instance.success) {
        return wrapper.error(instance.message, instance.code);
      }

      const connect = mongoose.connect(instance.data.db, instance.data.options);
      if (validate.isDefined(connect)) {
        return logger.info(cx, 'Connected to database', this.scope);
      }
    }

    catch (err: any) {
      logger.error(cx, err.message, this.scope);
      return process.exit(1);
    }
  }

}