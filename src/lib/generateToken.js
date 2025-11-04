import jwt from 'jsonwebtoken'

//returns a token, expires in an hour
export const generateToken = (user) => {
    return jwt.sign({
        userInfo: {
            _id: user._id,
            role: user.role,
        }

    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'})
}

//create two tokens?: one access token and one refresh token