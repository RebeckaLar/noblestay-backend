//Definiera Express-appen
//Ska ta in alla routes
import express from 'express'
import stayRoutes from './routes/stays.route.js'
import bookingRouter from './routes/bookings.route.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import userRoutes from './routes/user.route.js'


const app = express()
import cors from 'cors'

app.use(express.json()) 

app.use(cors())

app.use(express.json({ limit: "60mb" }))

app.use('/api/stays', stayRoutes)
app.use('/api/bookings', bookingRouter)
app.use('/api/auth', userRoutes)

app.use(notFound) // notFound
app.use(errorHandler) // errorHandler

export default app