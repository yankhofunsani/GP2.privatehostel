const mysql2=require("mysql2")
const pool=mysql2.createPool({
    database:ecommerce,
    host:"localhost",
    user:"root",
    password:"",
    waitingforconnection:true,
    connectionLimit:10,

});
module.exports={pool};