const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://vseqcjmo:jpBip-0subWpZcQbDZyN-g_PMpl_YZ6i@lallah.db.elephantsql.com/vseqcjmo",
  {
    dialect: "postgres",
  }
);

//Defines the model of our table which we already made in ElephantSQL
const Phrase = sequelize.define("Phrase", {
  phrase_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phrase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "phrases", 
  timestamps: false, 
});

module.exports = Phrase;

