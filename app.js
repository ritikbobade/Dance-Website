const express =require("express");
const path =require("path");
const fs = require("fs");
const app= express();
var mongoose = require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true});
const port=80;

var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    number: String,
    address: String,
    email: String
  });
var Contact = mongoose.model('Contact',contactSchema);

 
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This information was saved to database")
    }).catch(()=>{
        res.status(400).send("Error")
    })
    // res.status(200).render('contact.pug', params);
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});