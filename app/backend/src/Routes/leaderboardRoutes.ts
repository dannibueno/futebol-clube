import { Router, Request, Response } from 'express';
import leaderboardController from '../Controllers/leaderboardController';

const routers: Router = Router();

routers.get('/leaderboard/home', (req: Request, res: Response) => {
  leaderboardController.getLeaderboardHome(req, res);
});

export default routers;
