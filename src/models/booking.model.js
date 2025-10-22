//Skapa schema för bokningar
import mongoose from "mongoose";

//Skapa ny instans av Schema, öppna upp den som objekt definiera den
const bookingSchema = new mongoose.Schema({
    //booking id automatiskt, mongodb ger alla id:n automatiskt ett understreck _id
    bookedStay: { type: mongoose.Schema.Types.ObjectId, ref: 'Stay'},
    checkInDate: Number,
    checkOutDate: Number,
    room: String,
    guestType: String,
    numberOfGuests: Number,
    // price: Number
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking;
