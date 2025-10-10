//Servern ska  koppla upp sig mot vår db

import app from './app.js'

const PORT = process.env.PORT || 9000; //vi kmr få port nr av vår provider sen

const startServer = async () => { //vänta på saker färdiga
    try {
        //vill starta servern på just detta port-nr, så lyssna på den
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
        //NÄR PORT STARTAT IGÅNG => CLG
    } catch (error) {
        console.log('Failed to start server: ', error.message)
        process.exit(1)
    }
}

startServer()
