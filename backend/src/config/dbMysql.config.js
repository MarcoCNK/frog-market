import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: "bgwm636qfs6uywa2vbbb-mysql.services.clever-cloud.com",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306
})

console.log(pool)

pool.getConnection().then(() => {
    console.log('Connected to MySQL database');
}).catch((err) => {
    console.error('Error connecting to MySQL database:', err);
});

export default pool