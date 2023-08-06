const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    products: [
        {
            type: mongoose.ObjectId,
            ref: "Products",
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'newusers'
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Processed", "Processibg", "Shipped", "Delivered", "Canceled"]
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)