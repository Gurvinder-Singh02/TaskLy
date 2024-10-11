require('dotenv').config()


const PORT = process.env.PORT
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
const MONGODB_URL = process.env.MONGODB_URL

module.exports = {
    PORT,
    JWT_USER_PASSWORD  ,
    MONGODB_URL
}