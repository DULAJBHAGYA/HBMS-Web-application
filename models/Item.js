const mongoose = require("mongoose");
const multer = require ("multer");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a name"],
        trim:true,
        maxlength: [30, "Name cannot be more than 30 characters"],
    },
    file:{
        type:String,
        required:[true, "Please provide a file"],
    },
});

module.exports = mongoose.model('Item', itemSchema)