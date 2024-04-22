const mongoose = require("mongoose")

const connectDB = async ()=>{
    const url = process.env.MONGO_URI
    return mongoose.connect(url, {});
}

module.exports = connectDB;