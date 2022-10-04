import { Router, Request, Response } from 'express';
import TeamController from '../Controllers/teamController';

const routers: Router = Router();

// const teamController = new TeamController();

routers.get('/teams', (req: Request, res: Response) => {
  TeamController.getAllTimes(req, res);
});

routers.get('/teams/:id', (req: Request, res: Response) => {
  TeamController.getTeamById(req, res);
});

export default routers;
