const { Router } = require('express');
const { todoModel } = require('../db/db');

const { logger, auth } = require('../middlewares/middlewares');


const todoRouter = Router()

//create todo
todoRouter.post('/', auth, async (req, res) => {


    const user = req.user

    const { title, descriptionn, priorty } = req.body

    try {
        await todoModel.create({
            title, descriptionn, priorty, status: false, userId: user._id
        })

        res.send("todo created success")

    } catch (e) {
        res.send("some error ")
    }

})

// read all todos
todoRouter.get('/all', auth, async (req, res) => {

    const user = req.user

    try {

        const todos = await todoModel.find({ userId: user._id })

        res.json({
            todos, user
        })

    } catch (e) {
        res.send("some error ")
    }

})

//delete
todoRouter.delete('/:id', auth, async (req, res) => {

    const id = req.params.id

    try {

        const result = await todoModel.findByIdAndDelete(id)

        console.log(result, "deleted")

        res.json("deleted")

    } catch (e) {
        res.send("some error ")
    }

})


module.exports = {
    todoRouter
}