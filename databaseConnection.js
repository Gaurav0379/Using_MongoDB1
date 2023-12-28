const { Db } = require('mongodb');
const mongoose = require('mongoose');

function Dbconnection(){
    const DB_URL = process.env.MONGO_URL;
    mongoose.connect(DB_URL);
    
    const db = mongoose.connection;
    db.on("error",console.error.bind(console,"Connection Error!!"));
    db.once("open",function(){
        console.log("Connect to Database :-)");
    })

}

module.exports = Dbconnection;