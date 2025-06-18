const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['todo',"in-progress",'completed'],
        default:'todo'
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium'
    },
    boardId:{
        type:mongoose.Schema.Types.ObjectId,   // type reference id
        ref:'Board',     // ref id baord 
        required:true
    }
})

module.exports = mongoose.model('Task', taskSchema);
