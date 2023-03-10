import { Router, Request, Response } from 'express';
import AuthVerification from '../Middlewares/AuthVerification';
import MatchController from '../Controllers/matchController';

const routers: Router = Router();

routers.get('/matches', (req: Request, res: Response) => {
  MatchController.getAllMatches(req, res);
});

routers.post('/matches', AuthVerification, (req: Request, res: Response) => {
  MatchController.create(req, res);
});

routers.patch(
  '/matches/:id/finish',
  (req: Request<{ id: number }, unknown, unknown>, res: Response) => {
    MatchController.finishMatch(req, res);
  },
);

routers.patch(
  '/matches/:id',
  (req: Request<{ id: number }, unknown>, res: Response) => {
    MatchController.updateGoalsTeam(req, res);
  },
);

export default routers;
