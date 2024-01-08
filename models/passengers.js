const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
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
    address:{
        type:String,
        required:[true, "Please provide a address"],
        trim:true,
    },
    nic_no:{
        type:String,
        required:[true, "Please provide a NIC number"],
        trim:true,
        maxlength: [12, "Name cannot be more than 20 characters"],
        minlength: [12, "Name cannot be less than 20 characters"],
    },
    email:{
        type:String,
        required:[true, "Please provide a email"],
        trim:true,
    },
    
});

module.exports = mongoose.model('Passenger', passengerSchema)