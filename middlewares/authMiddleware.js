const JWT = require('jsonwebtoken')
const userModel = require('../models/userModel')

//protected Routes token base
const requireSignIn = async (req, res, next) => {
    try {

        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        res.status(403).send("Token not found")
    }
}

//admin access

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)

        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "unauthorized access"
            })
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: "Error in admin middleware",
            error
        })
    }
}

module.exports = { requireSignIn, isAdmin }