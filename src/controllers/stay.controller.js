import Stay from "../models/stay.model.js"

export const createCastleStay = async (req, res) => {
    const { title, description, price } = req.body

    if(!title || !description || !price) {
        //status 400, alltså fel från klientsidan, klienten har missat att skicka med required properties
        return res.status(400).json({ message: "Title, description and price are required"})
        //hantera required i modellen??
    }

    //Spara OCH skapa en castleStay till databasen samtidigt:
    const castleStay = await Stay.create({ title, description, price })
    // Samma sak som:
    // const castleStay = new Stay({ title, description, price })
    // await castleStay.save()
    
    res.status(201).json(castleStay)

    console.log(title, description, price)
}