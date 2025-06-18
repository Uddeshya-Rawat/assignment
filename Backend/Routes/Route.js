const express= require('express')
const router=express.Router()
const Board=require('../Models/Board')
const Task=require("../Models/Task")


// get board
router.get('/getBoards', async (req, res) => {
  try {
    const boards = await Board.find(); // latest first
    res.status(200).json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});






// create board
router.post('/createBoard', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
        console.log("no name")
      return res.status(400).json({ error: 'Board name is required' });
      
    }

    const newBoard = new Board({
      name,
      date: Date.now() // optional, default used if not provided
    });
   console.log("board", newBoard)
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating board' });
  }
});



// create task
router.post("/createTask", async (req,res)=>{
   try{
       const {title,description,status,priority,boardId}=req.body
       if(!title && !description){
        res.status(400).json({error:"title and desc required"})
       }

       const newTask=new Task({title,description,status,priority,boardId})
       const savedTask =await newTask.save()

        res.status(201).json(savedTask);



   }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
   }
})


router.get('/getTasks', async (req,res)=>{
    try{
        const tasks=await Task.find()
        res.status(200).send(tasks)


    }catch(error){
        res.status(400).json({error:"no task found"})
    }
})




// PUT /updateTask/:id
router.put('/updateTask/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const updateData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true } // return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});



// delete the task
router.delete('/deleteTask/:id', async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});



module.exports=router