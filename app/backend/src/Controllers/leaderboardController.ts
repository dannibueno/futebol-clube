import { Request, Response } from 'express';
import leaderboardService from '../Services/leaderboardService';

class leaderboardController {
  constructor(private service: leaderboardService) {}

  static async getLeaderboardHome(req: Request, res: Response) {
    const result = await leaderboardService.getLeaderboardHome();
    // console.log(result);
    return res.status(200).json(result);
  }
}

export default leaderboardController;
