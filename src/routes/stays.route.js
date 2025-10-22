import express from 'express'
import { createStay, getAllStays, getOneStay } from '../controllers/stay.controller.js'
import { createBooking, getAllBookings } from '../controllers/booking.controller.js'
const router = express.Router()

//CRUD FÖR BOENDEN
router.post('/', createStay) //CREATE
router.get('/', getAllStays) //READ
router.get('/:id', getOneStay) //READ

//CRUD FÖR BOKNINGAR I VARJE BOENDE
router.post('/:stayId', createBooking) //CREATE
router.get('/:stayId', getAllBookings) //READ
// router.get('/:id', getOneBooking) //READ

// router.route('/')
//     .post(createStay)
//     .get(getAllStays)

// router.route('/:id')
//     .get(getOneStay)

// router.route('/:id/booking')
//     .post


export default router //vill använda router i app.js