import IMatch from '../Interface/IMatch';
import MatchModel from '../database/models/Match';
import Team from '../database/models/Team';

class MatchService {
  constructor(private matchModel: MatchModel) {}

  static async getAllMatches(): Promise<IMatch[]> {
    const result = await MatchModel.findAll({ include: [
      {
        model: Team,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ],
    });
    return result as IMatch[];
  }

  static async getMatchesByInProgress(inProgress: boolean): Promise<IMatch[]> {
    const result = await MatchModel.findAll({
      where: { inProgress },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return result as IMatch[];
  }

  static async create(newMatch: IMatch): Promise<IMatch> {
    console.log('dfafafa');
    const result: IMatch = await MatchModel.create({
      homeTeam: newMatch.homeTeam,
      homeTeamGoals: newMatch.homeTeamGoals,
      awayTeam: newMatch.awayTeam,
      awayTeamGoals: newMatch.awayTeamGoals,
      inProgress: newMatch.inProgress,
    });
    return result;
  }

  static async finishMatch(id: number) {
    const Updated = await MatchModel.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );
    return Updated;
  }

  static async updateGoalsTeam(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const Updated = await MatchModel.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: { id },
      },
    );
    return Updated;
  }
}

export default MatchService;
