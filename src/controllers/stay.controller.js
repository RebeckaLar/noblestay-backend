import Stay from "../models/stay.model.js"
import mongoose from "mongoose"

export const createStay = async (req, res) => {
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
    
    res.status(201).json(castleStay) //med json metoden slipper vi stringify, sätta content-type osv.

    console.log(title, description, price)
}

export const getAllStays = async (req, res) => {
    const castleStays = await Stay.find().exec()
        //exec omvandlar detta query till ett promise, och ger bättre felmeddelanden enligt mongoose docs
    res.status(200).json(castleStays)
}

export const getOneStay = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const castleStay = await Stay.findById(id).exec() 

    if(!castleStay) {
        return res.status(404).json({ message: "Cannot find stay"})
    }

    res.status(200).json(castleStay)
}