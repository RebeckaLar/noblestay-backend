import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, //never save in plain text! encryption required
})

const User = mongoose.model('User', userSchema)

export default User;
