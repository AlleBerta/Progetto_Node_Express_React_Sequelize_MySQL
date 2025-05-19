const { verify } = require("jsonwebtoken")
const dotenv = require('dotenv').config()
const { constants } = require('../utils/constants')

const validateToken = (req, res, next) => {
    // Ricavo il token dall'header
    const accessToken = req.header("accessToken")
    // console.log('access Token: ' + accessToken)
    if (!accessToken) return res.status(constants.UNAUTHORIZED).json({ success: false, message: "User not logged in!" })

    try {
        // Ricavo il payload in chiaro
        const validToken = verify(accessToken, process.env.JWT_STRING)
        req.user = validToken

        if (validToken) {
            return next()
        }
    } catch (err) {
        return res.status(constants.VALIDATION_ERROR).json({ success: false, message: err })
    }
}


module.exports = { validateToken }