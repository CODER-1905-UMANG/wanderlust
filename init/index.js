const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>console.log(err));

const initDB = async()=> {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({
        ...obj,
        owner: "67fada710abc0752dfe6184c",
    }));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initDB();