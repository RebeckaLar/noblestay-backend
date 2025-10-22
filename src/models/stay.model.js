//Skapa schema för boenden

import mongoose from "mongoose";

//Skapa ny instans av Schema, öppna upp den som objekt definiera den
const staySchema = new mongoose.Schema({
    //id automatiskt, mongodb ger alla id:n automatiskt ett understreck _id
    title: String,
    description: String,
    price: Number,
    bookings: [{}]
})
//^nu har jag skapat schema men inte modell ännu, har bara sagt hur datan ska se ut.
//nu behöver kommunicera med db på ngt sätt

//Skapa modell/konstruktor/klass som används för att kommunicera med db
//och se till koppla ihop modellen med rätt collection
const Stay = mongoose.model('Stay', staySchema)

//HUR MODELLEN SKA ANVÄNDAS(ANVÄND INTE HÄR DOCK, FLYTTA TILL CONTROLLERS)
// const newStay = Stay.create()
export default Stay;
