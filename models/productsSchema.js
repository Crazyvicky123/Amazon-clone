const mongoose = require ("mongoose");


const productsSChema = new mongoose.Schema({
    id:String,
    url:String,
    deatilsUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String
});

const Products = new mongoose.model("products",productsSChema);

module.exports =Products;