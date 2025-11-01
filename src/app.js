//Definiera Express-appen
//Ska ta in alla routes
import express from 'express'
import stayRoutes from './routes/stays.route.js'
// import bookingRouter from './routes/bookings.route.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import userRoutes from './routes/user.route.js'

 //skapar en Express-app
const app = express() //sparar den i variabeln app. variabeln behövs också för att starta servern

app.use(express.json()) //middleware

app.use('/api/stays', stayRoutes)
// app.use('/api/bookings', bookingRouter)
app.use('/api/auth', userRoutes)

app.use(notFound) // notFound
app.use(errorHandler) // errorHandler

export default app