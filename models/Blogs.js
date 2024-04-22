const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title:{
        type: String, required : true
    }, 
    createdBy:{
        type: Object, required : true
    },
    content:{
        type: [Object]
    },
    createdAt:{
        type: Object, required : true
    },
    likes:{
        type: Number, default :0
    },
    comments:{
        type: [Object]
    }
    
})

module.exports = mongoose.model("Blog", BlogSchema)