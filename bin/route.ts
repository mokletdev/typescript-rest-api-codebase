import RestifyRouter from 'restify-router';
import response from '../utils/response';

import User from './modules/User/handler';

const router = new RestifyRouter.Router();

router.get('/', (req, res) => response.data(res, 'Route', 'Server routing is working properly.', 200));

/**
 * @description
 * Module A
 */
router.get('/users', User.getUsers);
router.get('/users/:id', User.getUserById);
router.post('/users/register', User.registerUser);


export default router;
