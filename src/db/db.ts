import  mysql  from 'mysql2/promise'
import dotenv from 'dotenv';

dotenv.config();

let pool = mysql.createPool({
  host: process.env.DBHOST, 
  user: process.env.DBUSER, 
  password: process.env.PASSWORD, 
  database: process.env.DBNAME,
})


export default pool;