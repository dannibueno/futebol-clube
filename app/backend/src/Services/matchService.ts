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
}

export default MatchService;
