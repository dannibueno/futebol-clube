import { BOOLEAN, INTEGER, Model, DataTypes } from 'sequelize';
import Team from './Team';
import db from '.';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  underscored: true,
  timestamps: false,
});

// Dica do course de como usar Associations:
// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
// belongsTo: pertencente a (1:1)

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
// hasMany: tem muitos (1:N)

// Team.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
// Team.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'home_team' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'away_team' });

export default Match;
