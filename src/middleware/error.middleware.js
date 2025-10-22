
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error) //skickas ned till errorhandler sen
}

export const errorHandler= (err, req, res, next) => {
    console.log(`Error: ${err.message}`)

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    // är statuskoden fortfarande 200, 
    // ändra till 500 eftersom vi kommit in i vår errorhandler

    res.status(statusCode).json({
        message: err.message //får ut felmeddelande tbx till klienten
        //anv stack i development läge??
    })
}