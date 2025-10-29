import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    bookedStay: { type: mongoose.Schema.Types.ObjectId, ref: 'Stay'},
    checkInDate: Number,
    checkOutDate: Number,
    room: String,
    guestType: String,
    numberOfGuests: Number,
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking;
