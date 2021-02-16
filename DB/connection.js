const mongoose = require("mongoose");

const URI = 'mongodb+srv://Rajiv_07:RP048aj120l@portfolio.gng9i.mongodb.net/portfolio_database?retryWrites=true&w=majority';


const connectDB = async () => {
    await mongoose.connect(URI,{ 
        useUnifiedTopology: true , 
        useNewUrlParser: true  
    });
    console.log('db connected');
 };
 
 module.exports = connectDB;