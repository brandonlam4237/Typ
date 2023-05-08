require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
    "postgres://vseqcjmo:jpBip-0subWpZcQbDZyN-g_PMpl_YZ6i@lallah.db.elephantsql.com/vseqcjmo",
    {
        dialect: "postgres",
    }
);

const PhraseSchema = sequelize.define("Phrase", {
    // Model Attributes defined here
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    length: {
        type: DataTypes.INTEGER,
    },
});

module.exports = sequelize.model("Phrase", PhraseSchema);
