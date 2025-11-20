import jwt from 'jsonwebtoken'

//returns a token, expires in an hour
export const generateToken = (user) => {
    return jwt.sign({
        userInfo: {
            _id: user._id,
            email: user.email
        }

    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'})
}

//FIX create two tokens?: one access token and one refresh token