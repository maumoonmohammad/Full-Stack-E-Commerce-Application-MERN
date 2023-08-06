const express = require("express")
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware")
const categoryModel = require("../models/categoryModel.jsx")
const slugify = require('slugify')

const router = express.Router()

//routes
//create Category
router.post('/create-category', requireSignIn, isAdmin, async (req, res) => {
    const { name } = req.body
    try {
        if (!name) {
            return res.status(401).send({
                success: false,
                message: "Name is required"
            })

        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "category already exists"
            })
        }
        const category = await categoryModel.create({ name, slug: slugify(name) })
        res.status(201).send({
            success: true,
            message: "category successfully created",
            category
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Category",
            error
        })
    }
})


//update Category
router.put('/update-category/:id', requireSignIn, isAdmin, async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        if (!name) {
            res.status(401).send({
                success: false,
                message: "name is required"
            })
        }
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        return res.status(200).send({
            success: true,
            message: "category Updated successfully",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating"
        })
    }
})

//get all Categories
router.get('/get-category', async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories"
        })
    }
})

//single actegory
router.get("/singlecategory/:slug", async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "get single category successful ",
            category

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "couldnt get the single category"
        })
    }
})

//delete category

router.delete("/delete-category/:id", requireSignIn, isAdmin, async (req, res) => {
    try {
        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "collection deleted",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "could not delete the collection",
            error
        })
    }
})


module.exports = router