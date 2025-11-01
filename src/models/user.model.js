import mongoose from "mongoose";
import ROLES from "../constants/roles.js";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }, //never save in plain text! encryption required
    role: { 
        type: String, 
        enum: [...Object.values(ROLES)], //motsvarar ['admin', 'value2', 'value3']
        //ROLES-objekt men vill ha array: 
        // Object.values för att komma åt värderna och 
        // spread för att inte göra en array i en array
        default: ROLES.RESIDENT
    }
})

const User = mongoose.model('User', userSchema)

export default User;
