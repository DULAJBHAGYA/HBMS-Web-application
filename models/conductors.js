const mongoose = require("mongoose");

const conductorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a name"],
        trim:true,
        maxlength: [30, "Name cannot be more than 10 characters"],
    },
    mobile_no:{
        type:String,
        required:[true, "Please provide a mobile number"],
        trim:true,
        maxlength: [10, "Mobile number cannot be more than 30 characters"],
        minlength:[10, "Mobile number cannot be less than 17 characters"]
    },
    license_no:{
        type:String,
        required:[true, "Please provide a license number"],
        trim:true,
        maxlength: [15, "License number cannot be more than 15 characters"],
        minlength: [15, "License number cannot be less than 15 characters"],
    },
    nic_no:{
        type:String,
        required:[true, "Please provide a NIC number"],
        trim:true,
        maxlength: [12, "Name cannot be more than 12 characters"],
        minlength: [12, "Name cannot be less than 12 characters"],
    }
    
});

module.exports = mongoose.model('Conductor', conductorSchema)