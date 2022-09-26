// get the client
// const mysql = require('mysql2');

import mysql from "mysql2/promise";
// create the connection to database
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "nodejsbasic",
// });

// simple query
//logic home controllers
// export default connection;

//Dùng cho promise, thay createConnection bằng createPool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
  // password: 'password'
});

export default pool;
