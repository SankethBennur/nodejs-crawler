const express = require('express');
const router= express.Router();
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const { json } = require('express/lib/response');
// const controller = require('./controller.js');
let jsonArray = [];
let keys = ['Questions', 'Count', 'Upvotes', 'Answers'];
fs.writeFile('stackoverflow.csv', keys.toString()+'\n', function (err) {
     if (err) throw err;
});


async function stackoverflow(url) {
     try {
          // const siteUrl = "https://stackoverflow.com/questions?tab=votes";
          const siteUrl = url;
          const { data } = await axios({
               method: 'GET',
               url: siteUrl,
          });
          const $ = cheerio.load(data);
          
          const elemSelector = $('.question-summary');
          // gets list of elements with class=question-summary

          $(elemSelector).each(async function (parentIdx, parentElem) {
               var jsonObj = {};
               
               // jsonObj.index = parentIdx;
               jsonObj.questionLink = "https://stackoverflow.com"+$(parentElem).find(".summary").find("a").attr("href");
               jsonObj.count = 1;
               jsonObj.upvotes = $(parentElem).find(".votes").find("strong").text();
               jsonObj.answers = $(parentElem).find(".status").find("strong").text();
               
               await append(jsonObj);
          });
          
     }
     catch (error) {
          console.log(error);
     }

}


async function append(jsonObj){
     // fetch match from jsonArray (initially empty)
     var match = jsonArray.filter(obj => {
          return obj.questionLink === jsonObj.questionLink;
     });

     // if match[0] is valid
          // match[0].count++;
     if(match[0]) match[0].count++;  // manipulation
     // else
          // jsonArray = jsonArray.concat(jsonObj);
     else jsonArray = jsonArray.concat(jsonObj);
     
     // send to csvfile
     convertToCSV(jsonArray);
}

async function convertToCSV(array){
     // get array string from parameter
     arr = array.map(it => {
          return Object.values(it).toString()
     }).join('\n')

     // write csv headings
     await fs.writeFile('stackoverflow.csv', keys.toString()+'\n'+arr, function (err) {
          if (err) throw err;
     });

     // // append entirely new array to the same file
     // await fs.appendFile('stackoverflow.csv', arr, function (err) {
     //      if (err) throw err;
     // });

}

// RECURSION
async function exec(url){
     pageNo = 1
     while(true){
          await stackoverflow(url.concat("&page=", pageNo));
          pageNo += 1;
     }
}

exec("https://stackoverflow.com/questions?tab=votes&");

// module.exports = exec;