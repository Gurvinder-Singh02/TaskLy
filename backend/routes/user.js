const { Router } = require('express');
const { userModel } = require('../db/db');

const { logger, auth } = require('../middlewares/middlewares');
const bcrypt = require('bcrypt');


const userRouter = Router()


const jwt = require('jsonwebtoken');

const { JWT_USER_PASSWORD } = require('../config');


userRouter.post('/signup', logger, async (req, res) => {

    try {
        const { email, password, firstName, lastName } = req.body

        console.log(req.body)

        let hashedPass = await bcrypt.hash(password, 4)

        console.log(hashedPass)

        await userModel.create({
            email, password: hashedPass, firstName, lastName
        })
        res.json({
            message: "You have successfully signup",
        })

    } catch (e) {
        console.log("some error happend while signin up", e);
        res.json({ e })
    }

})

userRouter.post('/signin', logger, async (req, res) => {

    const { email, password } = req.body
    console.log(email)

    try {
        let user = await userModel.findOne({ email })
        console.log(user)

        if (user) {

            let check = await bcrypt.compare(password, user.password)
            let token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD)

            if (check) {
                res.json({
                    message: "sucessfullly singed in ",
                    token
                })
            }

            else {
                res.json({
                    message: "incorrect pass "
                })
            }
        }


    } catch (e) {
        console.log("spome error happened", e);

    }


})

userRouter.get('/me', auth, async (req, res) => {

    const user = req.user

    console.log('--------',user)

    res.json({
        user
    })

})

module.exports = {
    userRouter
}