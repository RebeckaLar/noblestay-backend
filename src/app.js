//Definiera Express-appen
//Ska ta in alla routes
import express from 'express'
import stayRoutes from './routes/stays.route.js'
import bookingRouter from './routes/bookings.route.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import userRoutes from './routes/user.route.js'


const app = express() //sparar den i variabeln app. variabeln behövs också för att starta servern
import cors from 'cors'

 //skapar en Express-app

app.use(express.json()) //middleware

// Handle preflight for all routes using a regex (Express 5-safe)
// app.options(/.*/, cors());

// app.use(cors({
//   origin: "*", // allow your frontend
//   methods: ["GET", "POST", "OPTIONS"],
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
//   exposedHeaders: ["Authorization"],
//   optionsSuccessStatus: 204,
//   preflightContinue: false
// }));

app.use(cors())

app.use(express.json({ limit: "60mb" }))

// const whitelist = ['http://localhost:5137', 'http://localhost:8080']

// app.use(cors({
//     origin: (origin, callback) => {
//         if(whitelist.indexOf(origin) !== -1) { //om origin (var requesten skickats från) finns med i whitelist
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }))

//om multiple: whitelist function (see MERN #10 13:00)
// app.use(cors({
//     origin: '*'
// }))

//npm i cors instead^
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization, Origin, X-Requested-Width')
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET, POST')
//     }

//     next()
// })



app.use('/api/stays', stayRoutes)
app.use('/api/bookings', bookingRouter)
app.use('/api/auth', userRoutes)

app.use(notFound) // notFound
app.use(errorHandler) // errorHandler

export default app