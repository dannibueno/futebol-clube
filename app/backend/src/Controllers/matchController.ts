import { Request, Response } from 'express';
import TeamService from '../Services/teamService';
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

  static async create(req: Request, res: Response) {
    // console.log(req.body);
    // console.log(req.body.homeTeam);

    const resultHomeTeam = await TeamService.getTeamById(req.body.homeTeam);
    if (resultHomeTeam === null) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const resultAwayTeam = await TeamService.getTeamById(req.body.awayTeam);
    if (resultAwayTeam === null) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (req.body.homeTeam === req.body.awayTeam) {
      return res.status(401).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const newMatch = await MatchService.create(req.body);
    return res.status(201).json(newMatch);
  }

  static async finishMatch(req: Request<{ id: number }, unknown, unknown>, res: Response) {
    const { id } = req.params;
    await MatchService.finishMatch(id);
    return res.status(200).json({ message: 'Finished' });
  }

  static async updateGoalsTeam(req: Request<{ id: number }, unknown>, res: Response) {
    const { id } = req.params;
    // console.log(id);
    await MatchService.updateGoalsTeam(
      id,
      req.body.homeTeamGoals,
      req.body.awayTeamGoals,
    );
    return res.status(200).json({ message: 'Successful' });
  }
}

export default matchController;
