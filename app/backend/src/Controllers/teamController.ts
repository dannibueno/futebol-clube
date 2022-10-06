import { Request, Response } from 'express';
import TeamService from '../Services/teamService';

class teamController {
  constructor(private service: TeamService) {}

  static async getAllTimes(req: Request, res: Response) {
    // console.log('afafafa');
    const teams = await TeamService.getTeams();
    return res.status(200).json(teams);
  }

  static async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    // console.log('afafafa');
    const team = await TeamService.getTeamById(Number(id));
    return res.status(200).json(team);
  }
}

export default teamController;
