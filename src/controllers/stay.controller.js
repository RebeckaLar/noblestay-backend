import Stay from "../models/stay.model.js"
import mongoose from "mongoose"

export const createStay = async (req, res) => {
    const { title, description, price } = req.body;
    const owner = req.user._id

    if(!title || !description || !price) {
        return res.status(400).json({ message: "Title, description and price are required"})
        //hantera required i modellen??
    }

    //Spara OCH skapa en castleStay till databasen samtidigt:
    const castleStay = await Stay.create({ title, description, price, owner })
    
    res.status(201).json(castleStay) //med json metoden slipper vi stringify, sätta content-type osv.
    console.log(title, description, price)
}

export const getAllStays = async (req, res) => {
    const castleStays = await Stay.find().populate("title").exec()
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