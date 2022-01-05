const express = require('express');
const app = express();
const fs = require('fs');
const crawler = require('./crawler.js');

app.use(express.json());
app.use("/questions", crawler);  // Only purpose of server.js
require('dotenv').config();
const port = process.env.PORT || 5000;
const url = process.env.URL;


app.get("/", function(req, res){
     res.status(200).json({"URL": url});
});


// Listen
app.listen(port, function(){
     console.log(`Listening in port: ${port}`);
});