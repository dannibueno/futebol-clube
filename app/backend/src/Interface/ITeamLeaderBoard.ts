import IMatch from './IMatch';
import ITeam from './ITeam';

export interface ITeamLeaderBoardHome extends ITeam {
  matchesHome: IMatch[]
}

export interface ILeaderBoard {
  name:string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}
