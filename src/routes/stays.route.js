import express from 'express'
import { createStay, getAllStays, getOneStay, getStaysByUser } from '../controllers/stay.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'
const router = express.Router()

router.route('/')
    .post(verifyToken, createStay)
    .get(getAllStays)

router.route('/:id')
    .get(getOneStay)

router.route('/user')
    .get(verifyToken, getStaysByUser)


export default router //vill använda router i app.js