const Products = require("./models/productsSchema");
const productsdata = require("./constant/productdata");

const defaultdata = async()=>{
    try{

        await Products.deleteMany({});
        const storeData=await Products.insertMany(productsdata)
        console.log(storeData);

    }
    catch(error){
        console.log("error" + error.message);

    }
};

module.exports = defaultdata;