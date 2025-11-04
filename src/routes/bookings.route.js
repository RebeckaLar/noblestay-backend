import express from 'express'
import { createBooking, getAllBookings, getOneBooking } from '../controllers/booking.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

//CRUD
// router.post('/', createBooking) //CREATE
// router.get('/', getAllBookings) //READ
// router.get('/:id', getOneBooking) //READ

router.route('/')
    .post(verifyToken, createBooking)
    .get(verifyToken, getAllBookings)

export default router //vill använda router i app.js