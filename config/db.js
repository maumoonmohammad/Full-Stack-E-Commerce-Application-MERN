const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.URL_DB)
        console.log(`connected to database ${connect.connection.host}`)
    } catch (error) {
        console.log(`error in MongoDB ${error}`)
    }
}

module.exports = connectDB