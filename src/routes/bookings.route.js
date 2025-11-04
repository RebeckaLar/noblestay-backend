import express from 'express'
import { createBooking, getAllBookings, getOneBooking } from '../controllers/booking.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/')
    .post(verifyToken, createBooking)
    .get(verifyToken, getAllBookings)

export default router