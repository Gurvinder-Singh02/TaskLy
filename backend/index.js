const express = require('express');
const { userRouter } = require('./routes/user');
const { todoRouter } = require('./routes/todo');
const { PORT, MONGODB_URL } = require('./config');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRouter)
app.use('/api/v1/todos', todoRouter)


async function main() {
    await mongoose.connect(MONGODB_URL)
    app.listen(3000, () => {
        console.log(`Listening at ${PORT}`)
    })
}

main()