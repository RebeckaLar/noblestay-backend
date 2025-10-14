//Servern ska  koppla upp sig mot vår db

import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 9000; //vi kmr få port nr av vår provider sen
const MONGO_URI = process.env.MONGO_URI

const dbConnect = async (params) => {
    try {
        const mongo = await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected: ${mongo.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection error: ${error.message}`)
        process.exit(1)
    }
}

const startServer = async () => { //vänta på saker färdiga
    try {
        //await Promisen som dbConnect ska returnera:
        await dbConnect()
        //vill starta servern på just detta port-nr, så lyssna på den
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
        //NÄR PORT STARTAT IGÅNG => CLG
    } catch (error) {
        console.log('Failed to start server: ', error.message)
        process.exit(1)
    }
}

startServer()
