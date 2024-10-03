const mysql2=require("mysql2")
const pool=mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"hostel",
    waitForConnections:true,
    connectionLimit:10,

});
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
    connection.release(); 
});


module.exports={pool};