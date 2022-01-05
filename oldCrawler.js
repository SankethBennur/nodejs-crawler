const Crawler = require("crawler");
const url = require('url');
const fs = require('fs');


function convertToCSV(arr) {
     const array = [Object.keys(arr[0])].concat(arr)

     return array.map(it => {
          return Object.values(it).toString()
     }).join('\n')
}

const stackoverflow = new Crawler({
     maxConnections: 5,
     callback: function (error, result, done) {   // asynchronous execution
          var $ = result.$;
          var jsonArray = [];
          
          $('.question-summary').each(function (index) {
               var jsonOutput = {};

               jsonOutput.questionLink = "https://stackoverflow.com"+$(this).find(".summary").find("a").attr("href");
               jsonOutput.upvotes = $(this).find(".votes").find("strong").text();
               jsonOutput.answers = $(this).find(".status").find("strong").text();

               jsonArray.push(jsonOutput);

               fs.appendFile('stackoverflow.csv', convertToCSV(jsonArray), function (err) {
                    if (err) throw err;
               });
          });

     }
});

// stackoverflow.queue('https://stackoverflow.com/questions/')
stackoverflow.queue("https://stackoverflow.com/questions?tab=votes&page=10")

// module.exports = stackoverflow;