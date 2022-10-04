import { Request, Response } from 'express';
import MatchService from '../Services/matchService';

class matchController {
  constructor(private service: MatchService) {}

  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    // console.log(inProgress);

    if (inProgress === undefined) {
      const matches = await MatchService.getAllMatches();
      return res.status(200).json(matches);
    }

    const progress = inProgress === 'true';
    // console.log(progress);

    const result = await MatchService.getMatchesByInProgress(progress);
    // console.log(result);
    return res.status(200).json(result);
  }
}

export default matchController;
