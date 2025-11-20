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

        // Normalize dates -> store as timestamps (Number) per schema
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

    const booking = await Booking.findById(id).exec()

    if(!booking) {
        return res.status(404).json({ message: "Cannot find booking"})
    }

    res.status(200).json(booking)
}

export const getBookingsByUser = async (req, res) => {
    const id  = req.user._id
    
    const user = await user.findById(id).exec()

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    if(!user) {
        return res.status(400).json({ message: "User not found"})
    }

    const bookingsList = await Stay.find({ user: id }).exec()

    if(bookingsList.length === 0) {
        return res.status(200).json({ message: "No bookings yet"})
    }
    res.status(200).json( stayListings )
}
