const express =require("express");
//const{pool}=require("/database/connection.js");
const session=require("express");
const path = require('path');

const PORT =3000;
const HOST="localhost"
const app=express();

// middlewares
app.set("view engine","ejs");
app.set("views", path.join(__dirname, 'Ejs'));
app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'images')))


app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.get("/landlord",(req,res)=>{


    res.render("landlord");
})








app.listen (PORT,HOST,()=>{
    console.log (`server listening at port ${PORT}`)
});