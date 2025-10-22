import Booking from "../models/booking.model.js";
import mongoose from "mongoose";

export const createBooking = async (req, res) => {
    const { checkInDate, checkOutDate, room, guestType, numberOfGuests } = req.body

    if(!checkInDate || !checkOutDate || !room || !guestType || !numberOfGuests ) {
        return res.status(400).json({ message: "checkInDate, checkOutDate, room, guestType, and numberOfGuests are required"})
    }

    const booking = await Booking.create({ checkInDate, checkOutDate, room, guestType, numberOfGuests })
    res.status(201).json(booking)
    console.log(checkInDate, checkOutDate, room, guestType, numberOfGuests)
//body to send for testing:
// {
//     "checkInDate" : 22,
//     "checkOutDate" : 24,
//     "room" : "Standard",
//     "guestType" : "adult",
//     "numberOfGuests": 2
// }

}

export const getAllBookings = async (req, res) => {
    const bookings = await Booking.find().exec()
    res.status(200).json(bookings)
}

export const getOneBooking = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const booking = await Booking.findById(id).exec()

    if(!booking) {
        return res.status(404).json({ message: "Cannot find booking"})
    }

    res.status(200).json(booking)
}