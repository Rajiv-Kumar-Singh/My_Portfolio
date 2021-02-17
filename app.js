const express = require("express");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");





// connectDB();
// app.use(express.json({extended:false}));
// module.exports = connectDB;
// const MONGOLAB_URI = 'mongodb+srv://Rajiv_07:RP048aj120l@portfolio.gng9i.mongodb.net/foliodatabase?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/foliodatabase', {useNewUrlParser: true , useUnifiedTopology: true});
// mongoose.connect('mongodb+srv://Rajiv_07:<password>@portfolio.gng9i.mongodb.net/test', {useNewUrlParser: true});

mongoose.connection.on('connected',()=>{
    console.log('Moongoose is connected!!!!');
});


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


        // if(process.env.NODE_ENV ==='production') {
        //     app.use(express.static('build'));
        // }

//Start the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})