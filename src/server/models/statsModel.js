const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://vseqcjmo:jpBip-0subWpZcQbDZyN-g_PMpl_YZ6i@lallah.db.elephantsql.com/vseqcjmo",
  {
    dialect: "postgres",
  }
);

const Stats = sequelize.define("Stats", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wpm_pb_15_time:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    wpm_pb_30_time:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    wpm_pb_60_time:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    wpm_pb_10_words:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    wpm_pb_25_words:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    wpm_pb_50_words:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    acc_pb_15_time:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    acc_pb_30_time:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    acc_pb_60_time:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    acc_pb_10_words:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    acc_pb_25_words:{
        type: DataTypes.INTEGER,
        allownull: false
    },
    acc_pb_50_words:{
        type: DataTypes.INTEGER,
        allownull: false
    }
        
  }, {
    tableName: "stats", 
    timestamps: false, 
  });
  
  module.exports = Stats;