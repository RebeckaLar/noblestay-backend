import User from '../models/user.model.js'
//npm package bcryptjs helps encrypting passwords and decrypting password
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields'})
    }
    //all emails already lowercase in db
    //but i want to compare this email with existing emails
    //therefore i want to manually make the email lowercase first:
    const normalizedEmail = email.trim().toLowerCase()

    //email is already unique in db, butr i want to change the error message:
    if(await User.exists({ email: normalizedEmail })) {
        return res.status(409).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log({ password, hashedPassword })
}