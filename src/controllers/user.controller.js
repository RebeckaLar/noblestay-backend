import { generateToken } from '../lib/generateToken.js'
import User from '../models/user.model.js'
//npm package bcryptjs helps encrypting passwords
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

    // console.log({ password, hashedPassword })

    //Create user to db with lowercase email and encrypted password property:
    const user = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword
    })

    //Keep the user logged in by generating a JSON Web Token (access token):
    const token = generateToken(user)

    res.status(201).json({ _id: user._id, token, role: user.role})
}

export const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields'})
    }

    const user = await User.findOne({ email: email }).exec()

    if(!user) {
        //avoid giving clues on whether the email or the password is wrong, therefore send 401 because its still unauthorized.
        return res.status(401).json({ message: 'Invalid credentials'})
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        return res.status(401).json({ message: 'Invalid credentials'})
    }

    const token = generateToken(user)
    
    res.status(201).json({ _id: user._id, token, role: user.role})
}