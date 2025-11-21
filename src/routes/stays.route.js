import express from 'express'
import { createStay, getAllStays, getOneStay, getStaysByUser } from '../controllers/stay.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/', verifyToken, createStay)

router.get('/', getAllStays)

router.get('/:id', getOneStay)
router.get('/auth', verifyToken, getStaysByUser)

export default router