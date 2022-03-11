import User from './models/User';


import wrapper from '../../../utils/wrapper';
import { code } from '../../../utils/commons';


export default class Domain {

  public async getUsers() {
    const user = await User.find().exec();
    if (!user) {
      return wrapper.error('Error get data!', code.NOT_FOUND);
    }

    const data = user;

    return wrapper.data(data, '');
  }


  public async getUserById(payload: any) {
    const user = await User.findOne({ _id: payload.id }).exec();
    if (!user) {
      return wrapper.error('Data not found!', code.NOT_FOUND);
    }

    const data = user;

    return wrapper.data(data, '');
  }


  public async registerUser(payload: any) {
    const findUser = await User.findOne({ name: payload.name }).exec();
    if (findUser) {
      return wrapper.error('User already registered!', code.BAD_REQUEST);
    }

    const user = await User.create({
      name: payload.name,
      createdAt: new Date().toISOString()
    });

    if (!user) {
      return wrapper.error('Fail to insert user!', code.INTERNAL_ERROR);
    }

    const data = user;

    return wrapper.data(data, '');
  }

}
