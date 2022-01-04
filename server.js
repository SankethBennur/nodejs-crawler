const express = require('express');
const app = express();
const crawler = require('./crawler.js');

require('dotenv').config();
app.use(express.json());
const port = process.env.PORT || 5000;
const url = process.env.URL;


// backend home
app.get("/", function(req, res){
     res.status(200).json({"URL": url});
});


crawler.queue(url);


// Listen
app.listen(port, function(){
     console.log(`Listening in port: ${port}`);
});