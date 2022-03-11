import Domain from './domain';
import { code } from '../../../utils/commons';
import response from '../../../utils/response';


const domain = new Domain();


export default abstract class Handler {

  /** @description: getUsers Method Handler **/
  public static async getUsers(req: any, res: any) {
    const result = await domain.getUsers();
    if (!result.success) {
      return response.error(res, result.message, result.code);
    }

    return response.data(res, result.data, '');
  }


  /** @description: getUserById Method Handler **/
  public static async getUserById(req: any, res: any) {
    const params = { ...req.query, ...req.params };
    const result = await domain.getUserById(params);
    if (!result.success) {
      return response.error(res, result.message, result.code);
    }

    return response.data(res, result.data, '');
  }


  /** @description: getUsers Method Handler **/
  public static async registerUser(req: any, res: any) {
    const result = await domain.registerUser({ ...req.body });
    if (!result.success) {
      return response.error(res, result.message, result.code);
    }

    return response.data(res, result.data, '');
  }

}
