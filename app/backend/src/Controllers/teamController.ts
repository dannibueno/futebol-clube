import { Request, Response } from 'express';
import TeamService from '../Services/teamService';

class teamController {
  constructor(private service: TeamService) {}

  static async getAllTimes(req: Request, res: Response) {
    // console.log('afafafa');
    const teams = await TeamService.getTeams();
    return res.status(200).json(teams);
  }
}

export default teamController;
