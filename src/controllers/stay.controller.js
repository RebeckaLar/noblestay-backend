import Stay from "../models/stay.model.js"

export const createCastleStay = async (req, res) => {
    // res.send('Create stay')
    const castleStay = await Stay.create({
        title: 'Second stay',
        description: 'castle description',
        price: 800
    })
    res.json(castleStay)
}

// export const createCastleStay = async (req, res) => {
//     const { title, description, price } = req.body
//     console.log(title, description, price)
// }