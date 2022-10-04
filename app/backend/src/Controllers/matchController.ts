import { Request, Response } from 'express';
import MatchService from '../Services/matchService';

class matchController {
  constructor(private service: MatchService) {}

  static async getAllMatches(req: Request, res: Response) {
    // console.log('afafafa');
    const matches = await MatchService.getAllMatches();
    return res.status(200).json(matches);
  }
}

export default matchController;
