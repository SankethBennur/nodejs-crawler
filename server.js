const express = require('express');
const app = express();
const crawler = require('./crawler.js');
const fs = require('fs');

require('dotenv').config();
app.use(express.json());
const port = process.env.PORT || 5000;
const url = process.env.URL;


function convertToCSV(arr) {
     const array = [Object.keys(arr[0])].concat(arr)

     return array.map(it => {
          return Object.values(it).toString()
     }).join('\n')
}

function readJSONfile(){
     fs.readFile('stackoverflow.txt', 'utf-8', (err, data) => {
          if (err) { throw err; }
      
          // parse JSON object
          // const stackoverflow = JSON.parse(data.toString());
          return JSON.parse(data.toString());
      
          // print JSON object
          // console.log(stackoverflow);
     });
}


app.get("/", function(req, res){
     res.status(200).json({"URL": url});
});


crawler.queue(url);


// Listen
app.listen(port, function(){
     console.log(`Listening in port: ${port}`);
});