const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const authRoute = require('./routes/authRoute')
const cors = require('cors')
const app = express()
const categoryRoutes = require("./routes/categoryRoutes.jsx")
const ProductRoutes = require("./routes/ProductRoutes.jsx")
const path = require('path')
//config env
dotenv.config()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "./client/build")));


//Routes
app.use('/auth', authRoute)
app.use('/categories', categoryRoutes)
app.use('/products', ProductRoutes)

//Rest API  
app.get('/*', function (req, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})


///PORT Number
const PORT = process.env.BPORT || 5000

connectDB().then(() => {
    console.log("conneced to database");
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`)
    })
})

    ;

