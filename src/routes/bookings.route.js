import express from 'express'
import { createBooking, getAllBookings, getBookingsByUser, getOneBooking } from '../controllers/booking.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/', verifyToken, createBooking)

router.get('/', getAllBookings)

router.get('/:id', getOneBooking)
router.get('/auth', verifyToken, getBookingsByUser)

export default router