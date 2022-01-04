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
               // I may have to 
               // jsonOutput = [];

               jsonOutput.questionLink = "https://stackoverflow.com"+$(this).find(".summary").find("a").attr("href");
               jsonOutput.upvotes = $(this).find(".votes").find("strong").text();
               jsonOutput.answers = $(this).find(".status").find("strong").text();

               jsonArray.push(jsonOutput);
          });

          var i = 2
          while (i <= 3) {
               i += 1;
               // console.log(i);
               var url = "https://stackoverflow.com/questions?tab=votes&page=" + i;
               stackoverflow.queue(url);
          }

          fs.appendFile('stackoverflow.txt', JSON.stringify(jsonArray) + ",", function (err) {
          // fs.appendFile('stackoverflow.txt', convertToCSV(jsonArray), function (err) {
               if (err) throw err;
          });
     }
});

// stackoverflow.queue('https://stackoverflow.com/questions/')
// stackoverflow.queue("https://stackoverflow.com/questions?tab=votes")

module.exports = stackoverflow;
