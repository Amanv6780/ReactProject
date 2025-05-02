const mongoose = require('mongoose')
const ProductSchema =new mongoose.Schema({
    name:String,
    description:String,
    category:String,
    price: Number,
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}   // to fetch data from another collection need to give referance of aonother collection
})
module.exports = mongoose.model('Product',ProductSchema)