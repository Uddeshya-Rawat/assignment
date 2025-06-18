const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()
require('./db')
const router=require('./Routes/Route')

const PORT=3000;

const app=express()

app.use(cors());
app.use(express.json()); // for parsing JSON bodies

app.use(router)



app.listen(PORT,()=>{
    console.log("server started")
})