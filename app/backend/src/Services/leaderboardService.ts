import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import { ITeamLeaderBoardHome } from '../Interface/ITeamLeaderBoard';
import { processLeaderBoardHome, sortboard } from '../Utils/processLeaderBoard';

class leaderboardService {
  // constructor(private matchModel: MatchModel) {}

  static async getLeaderboardHome() {
    const teams = await this.findAllTeamHome() as unknown as ITeamLeaderBoardHome[];
    const board = processLeaderBoardHome(teams);
    const boardSorted = sortboard(board);

    // console.log(teams);

    return boardSorted;
  }

  static async findAllTeamHome() { // busca tds os times e incluiu para cada time os jogos da casa desse time.
    const result = await TeamModel.findAll({
      attributes: {
        exclude: ['id'],
      },

      include: [
        {
          model: MatchModel,
          as: 'matchesHome',
          where: { inProgress: 0 },
        },
      ],
    });

    return result;
  }
}

export default leaderboardService;
