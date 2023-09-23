const mongoose = require('mongoose');

const tradersDataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    last:{
        type:Number,
        required:true
    },
    buy:{
        type:Number,
        required:true
    },
    sell:{
        type:Number,
        required:true
    },
    volume:{
        type:Number,
        required:true
    },
    base_unit:{
        type:String,
        required:true
    },
    at:{
        type:Date,
    }


})

const tradersDataModel = new mongoose.model('tradersData', tradersDataSchema);

module.exports = tradersDataModel