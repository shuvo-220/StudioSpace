const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
require('./db/db');
const app = express();
app.use(express.json());


const PORT = process.env.PORT ;


app.listen(PORT, ()=>{
    console.log(`server is running on port : ${PORT}`)
})