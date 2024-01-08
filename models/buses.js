const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
    bus_no:{
        type:String,
        required:[true, "Please provide a bus number"],
        trim:true,
        maxlength: [10, "Name cannot be more than 10 characters"],
        minlength:[10, "Name cannot be less than 10 characters"]
    },
    name:{
        type:String,
        required:[true, "Please provide a name"],
        trim:true,
        maxlength: [30, "Name cannot be more than 30 characters"],
    },
    chassis_no:{
        type:String,
        required:[true, "Please provide a name"],
        trim:true,
        maxlength: [17, "Name cannot be more than 17 characters"],
        minlength:[17, "Name cannot be less than 17 characters"]
    },
    route:{
        type:String,
        required:[true, "Please provide a name"],
        trim:true,
        maxlength: [20, "Name cannot be more than 20 characters"],
    },
    seats:{
        type:String,
        required:[true, "Please provide a no. of seats"],
        trim:true,
        maxlength: [20, "Name cannot be more than 2 characters"],
    },
    permit_no:{
        type:String,
        required:[true, "Please provide a name"],
        trim:true,
        maxlength: [10, "Name cannot be more than 10 characters"],
        minlength:[10, "Name cannot be less than 10 characters"]
    },
    
});

module.exports = mongoose.model('Bus', busSchema)