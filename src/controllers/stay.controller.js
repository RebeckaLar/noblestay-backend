import Stay from "../models/stay.model.js"
import mongoose from "mongoose"

// CREATE STAY
export const createStay = async (req, res) => {
    const { 
      title, 
      description,
      location,
      price,
      availableEvent,
      image,
    // owner = req.user._id
     } 
      = req.body;
    const owner = req.user._id

    if(!title || !description || !location || !price || !availableEvent || !image) {
        return res.status(400).json({ message: "Title, description, location, price, available events and image are required"})
    }

    //Spara OCH skapa en castleStay till databasen samtidigt:
    const castleStay = await Stay.create({ title, description, location, price, availableEvent, image, owner: owner })
    
    res.status(201).json(castleStay) //med json metoden slipper vi stringify, sätta content-type osv.
}

export const getAllStays = async (req, res) => {
    const castleStays = await Stay.find().populate("title").exec()
    res.status(200).json(castleStays)
}

// READ STAY
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
    
    const user = await user.findById(id).exec()

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