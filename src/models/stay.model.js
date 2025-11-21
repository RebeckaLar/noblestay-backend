import mongoose from "mongoose";

const staySchema = new mongoose.Schema({
    title: String, 
    description: String,
    rules: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: String,
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking'}],
    guestType: String,
    numberOfGuests: Number,
    room: String,
    price: Number,
    availableEvent: String || null,
    image: String,
})

const Stay = mongoose.model('Stay', staySchema)

export default Stay;
