const  mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.Mongo_URI)
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))