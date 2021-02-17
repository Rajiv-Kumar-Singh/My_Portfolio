const express = require("express");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000;
// const connectDB = require('./DB/connection');
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");





//lets require/import the mongodb native drivers.
// var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
// var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
// var url = 'mongodb+srv://Rajiv_07:<password>@portfolio.gng9i.mongodb.net/<dbname>?retryWrites=true&w=majority';      
//(Focus on This Variable)

// Use connect method to connect to the Server
//   MongoClient.connect(url, function (err, db) {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     console.log('Connection established to', url);

//     // do some work here with the database.

//     //Close connection
//     db.close();
//   }
// });



// var url = process.env.MONGOLAB_URI;



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Rajiv_07:RP048aj120l@portfolio.gng9i.mongodb.net/portfolio_database?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("portfolio_database").collection("contactData");
  // perform actions on the collection object
  client.close();
});





// connectDB();
// app.use(express.json({extended:false}));
//  module.exports = connectDB;
// mongoose.connect('mongodb://localhost/portfolio_database', {useNewUrlParser: true});
// mongoose.connect('mongodb+srv://Rajiv_07:<password>@portfolio.gng9i.mongodb.net/test', {useNewUrlParser: true});


//Define mongoose Schema
var contactSchema = new mongoose.Schema({
name: String,
email: String,
contact: String,
message: String
});


var Contact = mongoose.model('Contact', contactSchema);

// module.exports = Contact = mongoose.model('Contact', contactSchema);



// Express Specific Stuff
app.use('/static',express.static('static'))    // For serving static files
app.use(express.urlencoded())           


// Pug Specific Stuff
app.set('view engine', 'pug')                                  // Set the template engine as pug
app.set('views',path.join(__dirname,'views'))                 


//ENDPOINTS
app.get('/',(req,res)=>{
    const params ={ }
    res.status(200).render('home.pug',params);
})

// app.get('/contact', (req, res)=>{
//     const params ={ }
//     res.status(200).render('./contact.pug',params);
// })

 app.post('/', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database");
    }).catch(()=>{
    res.status(400).send("Item was not saved to the database");
    });
    // res.send('Thank you!');
     // res.status(200).render('contact.pug');
 })

        //  app.use('myData',require('app'));

//Start the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})