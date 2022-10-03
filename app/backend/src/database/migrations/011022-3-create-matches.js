module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        field: 'home_team',
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: 'teams',
          key: 'id'
        },
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        allowNull: false,
        field: 'away_team',
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    },
  )},
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};