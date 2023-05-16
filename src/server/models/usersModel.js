const { Sequelize, DataTypes } = require("sequelize");
const { flattenDiagnosticMessageText } = require("typescript");
const sequelize = new Sequelize(
  "postgres://vseqcjmo:jpBip-0subWpZcQbDZyN-g_PMpl_YZ6i@lallah.db.elephantsql.com/vseqcjmo",
  {
    dialect: "postgres",
  }
);

//Defines the model of our table which we already made in ElephantSQL
const Users = sequelize.define("Users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  creationdate:{
    type: DataTypes.DATE
  },
  role:{
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  tableName: "users", 
  timestamps: false, 
});

module.exports = Users;