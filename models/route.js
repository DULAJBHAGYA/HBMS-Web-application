const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    route:{
        type:String,
        required:[true, "Please provide a bus route name"],
        trim:true,
        maxlength: [20, "ROute name cannot be more than 10 characters"],
    },
    route_no:{
        type:String,
        required:[true, "Please provide a bus route number"],
        trim:true,
        maxlength: [8, "Route number cannot be more than 8 characters"],
    },
    bus_stop1:{
        type:String,
        required:[true, "Please provide a bus stop"],
        trim:true,
        maxlength: [30, "Bus stop cannot be more than 30 characters"],
    },
    bus_stop3:{
        type:String,
        required:[true, "Please provide a bus stop"],
        trim:true,
        maxlength: [30, "Bus stop cannot be more than 30 characters"],
    },
    bus_stop4:{
        type:String,
        required:[true, "Please provide a bus stop"],
        trim:true,
        maxlength: [30, "Bus stop cannot be more than 30 characters"],
    },
    bus_stop5:{
        type:String,
        required:[true, "Please provide a bus stop"],
        trim:true,
        maxlength: [30, "Bus stop cannot be more than 30 characters"],
    },
    bus_stop6:{
        type:String,
        required:[true, "Please provide a bus stop"],
        trim:true,
        maxlength: [30, "Bus stop cannot be more than 30 characters"],
    },
    bus_stop7:{
        type:String,
        required:[true, "Please provide a bus stop"],
        trim:true,
        maxlength: [30, "Bus stop cannot be more than 30 characters"],
    }
    
});

module.exports = mongoose.model('Route', routeSchema)