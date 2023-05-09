require("dotenv").config();
const Pool = require("pg").Pool;
const Sequelize = require("sequelize");
//const connectionString = process.env.POSTGRES_URL;
const connectionString =
    "postgres://vseqcjmo:jpBip-0subWpZcQbDZyN-g_PMpl_YZ6i@lallah.db.elephantsql.com/vseqcjmo";
console.log(connectionString);
const config = {
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
};

//Sequalize
const connectDB = async () => {
    try {
        const pool = new Pool(config);
        module.exports = pool;
        await pool.connect();
        const sequelize = new Sequelize(connectionString, {
            host: "localhost",
            ssl: true,
            dialect: "postgres",
            dialectOptions: {
                ssl: { require: true },
            },
        });
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect : ", error);
    }
};



module.exports = connectDB;


// pool.connect(function(err) {
//      if(err) {
//       return console.error('could not connect to postgres', err);
//      }
//     pool.query('SELECT * FROM users', function(err, result) {
//       if(err) {
//         return console.error('error running query', err);
//       }
//       console.log("Connection Successful");
//       console.log(result.rows);
//       // >> output: 2018-08-23T14:02:57.117Z
//       pool.end();
//     });
//   });
//export default pool;
