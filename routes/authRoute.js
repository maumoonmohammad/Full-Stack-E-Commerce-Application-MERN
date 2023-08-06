const express = require('express')
const { hashPassword, comparePassword } = require('../helpers/authHelper')
const userModel = require('../models/userModel')
const JWT = require('jsonwebtoken')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const orderModel = require('../models/orderModel.jsx')



//router Object
const router = express.Router()

// FOR REGISTRATION
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        //validation
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone number is Required' })
        }
        if (!address) {
            return res.send({ message: 'address is Required' })
        }
        if (!answer) {
            return res.send({ message: 'answer is Required' })
        }

        //checkuser

        const existingUser = await userModel.findOne({ email })

        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered please Login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)

        //creata user
        const user = await userModel.create({ name, email, phone, address, answer, password: hashedPassword })
        return res.status(201).send({
            success: true,
            message: "user Registered Successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
})


//FOR LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return (res.status(401).send({
                success: false,
                message: 'invalid email or password'
            }))
        }



        //check user exists
        const user = await userModel.findOne({ email })
        if (!user) {
            return (res.status(401).send({
                success: false,
                message: 'user not registered'
            }))
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return (res.status(401).send({
                success: false,
                message: 'invalid password'
            }))
        }

        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        return (res.status(200).send({
            success: true,
            message: 'Login Successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }, token
        }))


    } catch (error) {
        console.log(error)
        return (res.status(500).send({
            success: false,
            message: 'Login Failed',
            error
        }))
    }
})



//Forgot Password API

router.post("/forgotpassword", async (req, res) => {
    const { email, answer, newpassword } = req.body
    try {

        if (!email) {
            res.status(401).send({
                success: false,
                message: 'Please provide e-mail'
            })
        }

        if (!answer) {
            res.status(401).send({
                success: false,
                message: 'Please provide asnwer'
            })
        }

        if (!newpassword) {
            res.status(401).send({
                success: false,
                message: 'Please provide New Password'
            })
        }

        const user = await userModel.findOne({ email, answer })

        //validation

        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'wrong email or asnwer'
            })
        }

        const hash_password = await hashPassword(newpassword)
        await userModel.findByIdAndUpdate(user._id, { password: hash_password })
        res.status(200).send({
            success: true,
            message: "Password succesfully changed"
        })

    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Password reset not succesful",
            error
        }

        )
    }


})

//test route
router.get('/test', requireSignIn, isAdmin, (req, res) => {
    res.send('You are now logged in as admin')

})

// protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true
    })
})


// protected admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true
    })
})

//Update Profile

router.put('/profile', requireSignIn, async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const user = await userModel.findById(req.user._id)
        //password
        if (password && password.length < 6) {
            return res.json({ error: "password is required and should be 6 character long" })
        }

        const hashedPassword = password ? await hashPassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,

        }, { new: true })
        res.status(200).send({
            success: true,
            message: "updated successfully",
            updatedUser

        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: 'error while updating profile',
            error
        })
    }
})

//user Orders

router.get('/orders', requireSignIn, async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate('products', "-photo").populate("buyer", "name")
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: "Error while getting orders",
            error,
            success: false
        })
    }
})






//admin all orders


router.get('/all-orders', requireSignIn, isAdmin, async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate('products', "-photo").populate("buyer", "name").sort({ createdAt: "-1" })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: "Error while getting orders",
            error,
            success: false
        })
    }
})


//Order status update

router.put('/order-status/:orderId', requireSignIn, isAdmin, async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: 'Error: not updated',
            success: false,
            error
        })
    }
})

module.exports = router