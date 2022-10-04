import { Router, Request, Response } from 'express';
import loginController from '../Controllers/loginController';
import AuthVerification from '../Middlewares/AuthVerification';

const routers: Router = Router();

routers.post('/login', (req: Request, res: Response) => {
  loginController.getOneLogin(req, res);
});

routers.get('/login/validate', AuthVerification, (req: Request, res: Response) => {
  loginController.loginValidate(req, res);
});

export default routers;
