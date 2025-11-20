import express from 'express'
import { checkToken, getUserProfile, login, register } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

// Base path is mounted at /api/auth in app.js; avoid double /auth
router.post('/register', register)
router.post('/login', login)

//INGEN CYHECKTOKEN I REGISTER
//VERITYOKEN FÖR BARA SKDYDADE ROUTES SÅSOM PROFILE ELLER LISTINGS
router.get('/profile', verifyToken, getUserProfile)
router.get('/check', verifyToken, checkToken)

export default router