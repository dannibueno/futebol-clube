import ITeam from '../Interface/ITeam';
import TeamModel from '../database/models/Team';

class TeamService {
  constructor(private teamModel: TeamModel) {}

  static async getTeams(): Promise<ITeam[]> {
    const result = await TeamModel.findAll();
    return result as ITeam[];
  }
}

export default TeamService;
