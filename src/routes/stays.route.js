import express from 'express'
import { createStay, getAllStays, getOneStay } from '../controllers/stay.controller.js'
import { createBooking, getAllBookings } from '../controllers/booking.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'
const router = express.Router()

//CRUD FÖR BOENDEN
// router.post('/', verifyToken, createStay) //CREATE
// router.get('/', getAllStays) //READ
// router.get('/:id', getOneStay) //READ

router.route('/')
    .post(verifyToken, createStay)
    .get(getAllStays)


//CRUD FÖR BOKNINGAR I VARJE BOENDE
// router.post('/:stayId', createBooking) //CREATE
// router.get('/:stayId', getAllBookings) //READ
// router.get('/:id', getOneBooking) //READ



export default router //vill använda router i app.js