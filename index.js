//Importing express
const express = require('express');
const port = 8081;
//Declaring it as app
const app = express();
//Importing dotenv
const dotenv = require('dotenv');
//Configering env file
dotenv.config();

//Importing routers
const bookrouter = require('/workspaces/Using_MongoDB1/Routes/book.js');
const userrouter = require('/workspaces/Using_MongoDB1/Routes/user.js');

const Dbconnection = require('/workspaces/Using_MongoDB1/databaseConnection.js');

Dbconnection();

// Importing models
const {UserModel,BookModel} = require('/workspaces/Using_MongoDB1/models/index.js');

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Home Page'
    })
})

app.use('/users',userrouter);
app.use('/books',bookrouter);

app.all('*',(req,res)=>{
    return res.status(500).json({
        success:false,
        message:'Not implemented!!'
    })
})

app.listen(port,()=>{
    console.log(`Server is runnig at port ${port}`);
})