import { ILeaderBoard, ITeamLeaderBoardHome } from '../Interface/ITeamLeaderBoard';
import IMatch from '../Interface/IMatch';

const calculateMatches = (matches: IMatch[]) => {
  let totalVictories = 0;
  let totalLosses = 0;
  let totalDraws = 0;
  let totalPoints = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((match: IMatch) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      totalVictories += 1; totalPoints += 3;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      totalLosses += 1;
    } else {
      totalDraws += 1; totalPoints += 1;
    }
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });
  return { totalVictories, totalLosses, totalDraws, totalPoints, goalsFavor, goalsOwn };
};

const calculateEfficiency = (totalPoints: number, totalGames: number) => {
  const result = (totalPoints / (totalGames * 3)) * 100;
  return result.toFixed(2);
};

const sortboard = (leaderboard: ILeaderBoard[]) => {
  const sort = leaderboard.sort((aBoard: ILeaderBoard, bBoard: ILeaderBoard) => {
    if (aBoard.totalPoints < bBoard.totalPoints) { return 1; }
    if (aBoard.totalPoints > bBoard.totalPoints) { return -1; }
    if (aBoard.totalVictories < bBoard.totalVictories) { return 1; }
    if (aBoard.totalVictories > bBoard.totalVictories) { return -1; }
    if (aBoard.goalsBalance < bBoard.goalsBalance) { return 1; }
    if (aBoard.goalsBalance > bBoard.goalsBalance) { return -1; }
    if (aBoard.goalsFavor < bBoard.goalsFavor) { return 1; }
    if (aBoard.goalsFavor > bBoard.goalsFavor) { return -1; }
    if (aBoard.goalsOwn < bBoard.goalsOwn) { return 1; }
    if (aBoard.goalsOwn > bBoard.goalsOwn) { return -1; }
    return 0;
  });
  return sort;
};

//  recebe lista de times e para cada time calcula classificação.

const processLeaderBoardHome = (teams: ITeamLeaderBoardHome[]) => {
  const board = teams.map((team) => {
    const name = team.teamName;
    const { totalVictories, totalLosses, totalDraws, totalPoints, goalsFavor, goalsOwn,
    } = calculateMatches(team.matchesHome);
    const totalGames = team.matchesHome.length;

    return { name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: calculateEfficiency(totalPoints, totalGames),
    };
  });
  return board;
};

export { processLeaderBoardHome, sortboard };
