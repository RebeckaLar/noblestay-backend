import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    title: String,
    roomCategory: {
        type: String,
        enum: ["Standard Castle Room", "Luxury Suite", "Unique Tower Room"]
    },
    description: String,
    price: Number
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
