import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookedStay: { type: mongoose.Schema.Types.ObjectId, ref: 'Stay', required: true},
    checkInDate: Number,
    checkOutDate: Number,
    room: String,
    guestType: String,
    numberOfGuests: Number,
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking;
