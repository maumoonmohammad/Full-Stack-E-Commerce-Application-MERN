const express = require('express')
var braintree = require("braintree");
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const productModel = require('../models/productModel.jsx')
const formidable = require("express-formidable")  /// Middleware for uploading images while creating the product
const slugify = require('slugify')
const fs = require("fs") // file system
const categoryModel = require('../models/categoryModel.jsx');
const orderModel = require('../models/orderModel.jsx');
const dotenv = require("dotenv")
dotenv.config()


const router = express.Router()

//routes
//Create Product Route
router.post('/create-product', requireSignIn, isAdmin, formidable(), async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields// fields instead of body coz we are using formidable middleware   
        const { photo } = req.files   // for uploading the picture of the product using formidable middleware

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !description:
                return res.status(500).send({ error: 'Description is Required' })
            case !price:
                return res.status(500).send({ error: 'Price is Required' })
            case !category:
                return res.status(500).send({ error: 'Category is Required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is Required' })
            case photo && photo.size > 10000000:
                return res.status(500).send({ error: 'Photo is Required and should be less than 1MB' })

        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product Created successfully",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in creating product"
        })
    }
})


//get-products
router.get('/get-products', async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").populate("category").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            counTotal: products.length, //total number of products returned
            message: "got all products",
            products,

        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error in getting products'
        })
    }
})

//get single Product

router.get("/single-product/:slug", async (req, res) => {
    try {
        const { slug } = req.params
        const product = await productModel.findOne({ slug }).select("-photo").populate('category')
        res.status(200).send({
            success: true,
            message: "successfully fetched the product",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "couldnt fetch a single product"

        })
    }
})

//get Photo

router.get("/product-photo/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productModel.findById(pid).select("photo")

        if (product.photo.data) {
            res.set('content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "couldnt get the product image",
            error
        })
    }
})

//DELETE PRODUCT API    

router.delete("/delete-product/:pid", requireSignIn, isAdmin, async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productModel.findByIdAndDelete(pid)
        res.status(200).send({
            success: true,
            message: "product deleted",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "could not delete the image",
            error
        })
    }
})

// UPDATE PRODUCT

router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), async (req, res) => {
    try {
        const { pid } = req.params
        const { name, slug, description, price, category, quantity, shipping } = req.fields// fields instead of body coz we are using formidable middleware   
        const { photo } = req.files   // for uploading the picture of the product using formidable middleware

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !description:
                return res.status(500).send({ error: 'Description is Required' })
            case !price:
                return res.status(500).send({ error: 'Price is Required' })
            case !category:
                return res.status(500).send({ error: 'Category is Required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is Required' })
            case photo && photo.size > 10000000:
                return res.status(500).send({ error: 'Photo is Required and should be less than 1MB' })

        }




        const product = await productModel.findByIdAndUpdate(pid, { ...req.fields, slug: slugify(name) }, { new: true })

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(200).send({
            success: true,
            message: "product successfully updated",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in updating the product",
            error
        })
    }
})


// filter on the basis of category and price

router.post('/filter-products', async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            message: 'got the products successfully',
            products
        })

    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: 'could not fetch products',
            error
        })
    }
})

//Total product count 

router.get('/product-count', async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: "Error in product count",
            error,
            success: false
        })
    }
})


//pagination
router.get("/product-list/:page", async (req, res) => {
    try {
        const perPage = 4
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "done",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: 'error in per page control',
            error
        })
    }
})

// search product using keyword

router.get("/search/:keyword", async (req, res) => {
    try {
        const { keyword } = req.params
        const products = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } }, // case insensitive using 'i'
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo")
        res.status(200).send({
            success: true,
            message: "found products",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message: 'Error in search Product API',
            error
        })
    }
})

//similar products

router.get('/related-products/:id/:cid', async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate('category')
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            messsage: 'no similar products',
            error
        })
    }
})

//product-category

router.get('/product-category/:slug', async (req, res) => {
    const { slug } = req.params
    try {
        const category = await categoryModel.findOne({ slug })
        const products = await productModel.find({ category }).populate('category')
        res.status(200).send({
            success: true,
            category,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: "could not find category",
            error,
            success: false
        })
    }
})



//payment gateway



var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


//payments Route

//Token from Braintree not the user

router.get('/braintree/token', async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error)
    }
})


//payments

router.post('/braintree/payment', requireSignIn, async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0
        cart.map((item) => {
            total = total + item.price
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
            function (error, result) {

                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
})


module.exports = router