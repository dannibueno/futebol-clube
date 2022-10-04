import { Router, Request, Response } from 'express';
import loginController from '../Controllers/loginController';

const routers: Router = Router();

routers.post('/login', (req: Request, res: Response) => {
  loginController.getOneLogin(req, res);
});

export default routers;
