const mongoose = require("mongoose")
const DB_NAME = require('../constants/constants')


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect('mongodb+srv://root:root@cluster0.xgaorx8.mongodb.net/demo-api?retryWrites=true&w=majority')
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = connectDB