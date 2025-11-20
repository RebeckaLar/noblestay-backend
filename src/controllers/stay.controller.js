import Stay from "../models/stay.model.js"
import mongoose from "mongoose"

export const createStay = async (req, res) => {
    const { title, description, price } = req.body;  //FIX PROPS
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

export const getStaysByUser = async (req, res) => {
    const id  = req.user._id
    
    const user = await user.findById.exec()

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    if(!user) {
        return res.status(400).json({ message: "User not found"})
    }

    const stayListings = await Stay.find({ owner: id }).exec()

    if(stayListings.length === 0) {
        return res.status(200).json({ message: "No castle stays created yet"})
    }
    res.status(200).json( stayListings )
}

//FIX GET STAYS BY FILTER