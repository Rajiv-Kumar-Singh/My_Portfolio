const express = require("express");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");



mongoose.connect('mongodb://localhost/portfolio_database', {useNewUrlParser: true});


//Define mongoose Schema
var contactSchema = new mongoose.Schema({
name: String,
email: String,
contact: String,
message: String
});


var Contact = mongoose.model('Contact', contactSchema);



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
// app.get('/about', (req, res)=>{
//     const params ={ }
//     res.status(200).render('./about.pug',params);
// })
// app.get('/skills', (req, res)=>{
//     const params ={ }
//     res.status(200).render('./skills.pug',params);
// })
// app.get('/work', (req, res)=>{
//     const params ={ }
//     res.status(200).render('./work.pug',params);
// })


 app.post('/', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database");
    }).catch(()=>{
    res.status(400).send("Item was not saved to the database");
    });
     // res.status(200).render('contact.pug');
 })


//Start the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})