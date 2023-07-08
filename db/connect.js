const mongoose = require("mongoose");

// const connectionString = process.env.MONGO_URI;
const connectDB = (url) =>{

    return mongoose.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
}

module.exports = connectDB