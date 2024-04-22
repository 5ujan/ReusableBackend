const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type: String, 
        required : true
    },
    avatar:{
        type: String
    }, 
    email: {
        type: String,
    }, 
    isMember:{
        type: Boolean, default: false
    },
    isAdmin:{
        type: Boolean, default: false
    }
})

module.exports = mongoose.model("User", UserSchema)