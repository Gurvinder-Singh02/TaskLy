const logger = (req, res, next) => {
    console.log(req.method, req.url)
    next()
}

const mongoose = require('mongoose');


const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose

const jwt = require('jsonwebtoken');

const { JWT_USER_PASSWORD } = require('../config');

const { userModel } = require('../db/db');

const auth = async (req, res, next) => {

    try {

        console.log("---xxxxx-----xxxx", req.method, req.url, req.body)

        const token = req.headers.token

        console.log("token", token)

        if (token) {
            let check = await jwt.verify(token, JWT_USER_PASSWORD)
            console.log(check.id, "the token");

            const userId = check.id

            let user = await userModel.findById(userId)

            console.log(user.firstName, " : user is authenticated you can procceed")

            req.user = user
            req.body = req.body

            next()
        }

        else {

            res.json({
                message: " no token founded "
            })
        }
    } catch (e) {
        res.json({
            message: " no token founded ", e
        })
    }

}


module.exports = {
    logger,
    auth
}