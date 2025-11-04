import express from 'express'
import { createStay, getAllStays, getOneStay } from '../controllers/stay.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'
const router = express.Router()

router.route('/')
    .post(verifyToken, createStay)
    .get(getAllStays)

router.route('/:id')
    .get(getOneStay)


export default router //vill använda router i app.js