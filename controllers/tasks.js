const Task = require('../models/Tasks')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper (async(req,res) =>{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const createTask = asyncWrapper(async (req,res) =>{
    // const {name,completed} = req.body
    const task = await Task.create(req.body)
    res.status(201).json(task)
 
})
const getTask = asyncWrapper(async (req,res, next) =>{
    // res.json({id: req.params.id})
        const {id:taskID} =req.params
        const task = await Task.findOne({_id: taskID})
        if(!task) {
            throw new Error('User not found');

            // return next(createCustomError(`No task with id: ${taskID}`, 404))
             // error goes error-handler err parmarter
            // return res.status(404).json({msg: `No task with id: ${taskID}`})

        }
        res.status(200).json({task})  
})
const updateTask = asyncWrapper(async (req,res) =>{
        const {id:taskID} =req.params
        const task = await Task.findOneAndUpdate({_id: taskID},req.body,{
            new: true,
            runValidators: true
        })
        if(!task) {
            return res.status(404).json({msg: `No task with id: ${taskID}`})

        }
        res.status(200).json({task})
   

})
const deleteTask = asyncWrapper( async (req,res) =>{
        const {id:taskID} =req.params
        const task = await Task.findOneAndDelete({_id: taskID})
        if(!task) {
            return res.status(404).json({msg: `No task with id: ${taskID}`})

        }
        res.status(200).json({task})
    }
)

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}