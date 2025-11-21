import Booking from "../models/booking.model.js";
import mongoose from "mongoose";
import Stay from "../models/stay.model.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
    try {
        const {
            checkInDate,
            checkOutDate,
            room,
            guestType,
            numberOfGuests,
            stayId
        } = req.body;
        const user = req.user?._id;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: user missing' });
        }

        if (!checkInDate || !checkOutDate || !room || !guestType || !numberOfGuests || !stayId) {
            return res.status(400).json({
                message: 'checkInDate, checkOutDate, room, guestType, numberOfGuests, stayId are required'
            });
        }

        //Validate stay
        if (!mongoose.Types.ObjectId.isValid(stayId)) {
            return res.status(400).json({ message: 'Invalid stayId' });
        }
        const stay = await Stay.findById(stayId).exec();
        if (!stay) {
            return res.status(404).json({ message: 'Stay not found' });
        }

        // Normalize dates -> store as timestamps (Number) per schema //FIX IMPORTANT
        const checkInTs = new Date(checkInDate).getTime();
        const checkOutTs = new Date(checkOutDate).getTime();
        if (isNaN(checkInTs) || isNaN(checkOutTs)) {
            return res.status(400).json({ message: 'Invalid date format' });
        }
        if (checkOutTs <= checkInTs) {
            return res.status(400).json({ message: 'checkOutDate must be after checkInDate' });
        }

        const newBooking = await Booking.create({
            user,
            bookedStay: stayId,
            checkInDate: checkInTs,
            checkOutDate: checkOutTs,
            room,
            guestType,
            numberOfGuests
        });

        //Attach booking to stay doc if bookings array exists
        if (Array.isArray(stay.bookings)) {
            stay.bookings.push(newBooking._id);
            await stay.save();
        }

        return res.status(201).json(newBooking);
    } catch (err) {
        console.error('createBooking error', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//READ BOOKING
export const getAllBookings = async (req, res) => {
    const bookings = await Booking.find().exec()
    res.status(200).json(bookings)
}

export const getOneBooking = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const booking = await Booking.findById(id).populate('bookedStay').exec()

    if(!booking) {
        return res.status(404).json({ message: "Cannot find booking"})
    }

    res.status(200).json(booking)
}

export const getBookingsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        // Find bookings for this user and populate bookedStay
        const bookings = await Booking.find({ user: userId }).populate('bookedStay').exec();

        if (!bookings || bookings.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(bookings);
    } catch (err) {
        console.error('getBookingsByUser error', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
