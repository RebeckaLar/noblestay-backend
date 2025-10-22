//Definiera Express-appen
//Ska ta in alla routes
import express from 'express'
import stayRoutes from './routes/stays.route.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
 //skapar en Express-app
const app = express() //sparar den i variabeln app. variabeln behövs också för att starta servern

// app.get('/api/stays', (req, res) => {
//     res.send('All stays')
// })

// app.get('/api/stays/:id', (req, res) => {
//     res.send('One stay')
// })

// app.post('/api/stays', (req, res) => {
//     res.send('Create stay')
// })

// app.post('/api/auth/login')
// app.post('/api/auth/register')

app.use(express.json()) //middleware

app.use('/api/stays', stayRoutes)

app.use(notFound) // notFound
app.use(errorHandler) // errorHandler

export default app