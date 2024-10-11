const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const todoSchmea = new Schema(
    {

        title: String,
        descriptionn: String,
        priorty: String,

        status: Boolean,
        userId: ObjectId,
    }, { timestamps: true })

const userModel = mongoose.model("user", userSchema)
const todoModel = mongoose.model("todo", todoSchmea)

module.exports = {
    userModel,
    todoModel
}

async function cleardb() {
    await userModel.deleteMany({})
    await todoModel.deleteMany({})
}

// cleardb()