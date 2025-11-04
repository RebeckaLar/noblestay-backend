//A user should not be able to make any http-request if they're unauthorized
//Middleware to check if token exists

import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.authorization
        
        if(!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Not authenticated. No token provided'})
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        //save userInfo to the request-object:
        req.user = decoded.userInfo
        //everytime we send a token, we have access to req.user
        
        //IF VERIFIED:
        next()

    } catch (error) {
        return res.status(401).json({ message: 'Not authenticated'})
    }
}

