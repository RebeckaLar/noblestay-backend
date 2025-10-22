import express from 'express'
import { createStay, getAllStays, getOneStay } from '../controllers/stay.controller.js'
// import Stay from '../models/stay.model.js'

const router = express.Router()

// router.get('/api/stays', (req, res) => {
// router.get('/', (req, res) => {
//     res.send('All stays')
// })

// router.get('/:id', (req, res) => {
//     res.send('One stay')
// })

// router.post('/', async (req, res) => {
//     // res.send('Create stay')
//     const castleStay = await Stay.create({
//         title: 'First stay',
//         description: 'castle description',
//         price: 300
//     })
//     res.json(castleStay)
// })

//CRUD
router.post('/', createStay) //CREATE
router.get('/', getAllStays) //READ
router.get('/:id', getOneStay) //READ

export default router //vill använda router i app.js