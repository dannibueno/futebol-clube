import { Router, Request, Response } from 'express';
import MatchController from '../Controllers/matchController';

const routers: Router = Router();

routers.get('/matches', (req: Request, res: Response) => {
  MatchController.getAllMatches(req, res);
});

export default routers;
