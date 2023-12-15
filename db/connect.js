const mongoose = require("mongoose");

// const connectionString = process.env.MONGO_URI;
const connectDB = (url) =>{
    const conn = mongoose.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database connected.`)
        return conn;
}

module.exports = connectDB