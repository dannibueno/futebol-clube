import ITeam from '../Interface/ITeam';
import TeamModel from '../database/models/Team';

class TeamService {
  constructor(private teamModel: TeamModel) {}

  static async getTeams(): Promise<ITeam[]> {
    const result = await TeamModel.findAll();
    return result as ITeam[];
  }

  static async getTeamById(id: number): Promise<ITeam | null> {
    // console.log('tetetetsts');

    const team = await TeamModel.findOne({ where: { id } });

    return team as ITeam | null;
  }
}

export default TeamService;
