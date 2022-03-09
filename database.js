const mongoose = require("mongoose");

const db = mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
.then(() => {
    console.log("Connect To database!!");
}).catch(e =>{
    console.log("COnection failed!");
    console.log(e);
});

module.exports = db;