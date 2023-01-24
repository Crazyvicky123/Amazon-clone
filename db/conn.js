const moongose = require("mongoose");
const db = process.env.DATABASE;

moongose.connect(db).then(()=>console.log("database connected")).catch((error)=>console.log("error" + error.message))
