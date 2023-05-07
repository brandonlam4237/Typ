import {Pool} from "pg";

const pool = new Pool({
    connectionString:"postgres://vseqcjmo:jpBip-0subWpZcQbDZyN-g_PMpl_YZ6i@lallah.db.elephantsql.com/vseqcjmo",
    ssl:{
        rejectUnauthorized: false
    }
});
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

  export default pool;