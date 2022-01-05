const express = require('express');
const router= express.Router();
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const { json } = require('express/lib/response');
// const controller = require('./controller.js');

let keys = ['Index', 'Questions', 'Count', 'Upvotes', 'Answers'];
fs.appendFile('stackoverflow.csv', keys.toString()+'\n', function (err) {
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
          
          // [may require a while loop if element doesn't exist. Stops recursion.]
          const elemSelector = $('.question-summary');
          // gets list of elements with class=question-summary

          $(elemSelector).each(async function (parentIdx, parentElem) {
               var jsonObj = {};
               
               jsonObj.index = parentIdx;
               jsonObj.questionLink = "https://stackoverflow.com"+$(parentElem).find(".summary").find("a").attr("href");
               jsonObj.count = 1;
               jsonObj.upvotes = $(parentElem).find(".votes").find("strong").text();
               jsonObj.answers = $(parentElem).find(".status").find("strong").text();
               
               append(jsonObj);
          });
          
     }
     catch (error) {
          console.log(error);
     }

}


async function append(obj){

     // jsonValues = Object.values(obj).toString() 
     // console.log(jsonValues);

     await fs.appendFile('stackoverflow.csv', Object.values(obj).toString().concat('\n'), function (err) {
          if (err) throw err;
     });
}


// RECURSION
async function exec(url){
     pageNo = 1
     while(true){
          await stackoverflow(url.concat("&page=", pageNo));
          pageNo += 1;
     }
}


// exec("https://stackoverflow.com/questions?tab=votes&");

module.exports = exec;