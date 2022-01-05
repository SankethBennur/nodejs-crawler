const express = require('express');
const router= express.Router();
const fs = require('fs');
const axios = require('axios');
const Question = require('./schema/schema.questions');
const cheerio = require('cheerio');
const { json } = require('express/lib/response');

// initializing an empty array, keys for .csv, and the .csv file itself
let jsonArray = [];
let keys = ['Questions', 'Count', 'Upvotes', 'Answers'];
fs.writeFile('stackoverflow.csv', keys.toString()+'\n', function (err) {
     if (err) throw err;
});


// function to scrape from the url
async function stackoverflow(url) {
     try {
          // const siteUrl = "https://stackoverflow.com/questions?tab=votes";
          const siteUrl = url;
          // get url's html body
          const { data } = await axios({
               method: 'GET',
               url: siteUrl,
          });
          const $ = cheerio.load(data);
          // axios helps fetch the url's html body
          
          const elemSelector = $('.question-summary');
          // gets list of elements with class=question-summary

          // for each .question-summary element
          $(elemSelector).each(async function (parentIdx, parentElem) {
               var jsonObj = {};
               // fetch body content from each element
               // store into object - jsonObj

               // create jsonObj properties
               
               // jsonObj.index = parentIdx;
               jsonObj.questionLink = "https://stackoverflow.com"+$(parentElem).find(".summary").find("a").attr("href");
               jsonObj.count = 1;
               jsonObj.upvotes = $(parentElem).find(".votes").find("strong").text();
               jsonObj.answers = $(parentElem).find(".status").find("strong").text();

               // verify if each object is in an array of element objects
               await append(jsonObj);
          });
          
     }
     catch (error) {
          console.log(error);
     }

}


// function to find a match of question url in the array of jsonObj
async function append(jsonObj){
     // save to mongodb atlas
     const newQuestion = new Question({
          question: jsonObj.questionLink,
          count: jsonObj.count,
          upvotes: jsonObj.upvotes,
          answers: jsonObj.answers
     });

     newQuestion.save()
          .then()
          .catch();

     // fetch match from jsonArray (initially empty)
     var match = jsonArray.filter(obj => {
          return obj.questionLink === jsonObj.questionLink;
     });

     // if match[0] is valid
          // increment count
     if(match[0]) match[0].count++;  // manipulation
     // else
          // append newobject to jsonArray
     else jsonArray = jsonArray.concat(jsonObj);
     
     // pass newly created array to add to .csv file
     await convertToCSV(jsonArray);
}

// function to write/append to .csv file
async function convertToCSV(array){
     // get array string from parameter
     arr = array.map(it => {
          return Object.values(it).toString()
     }).join('\n');

     // write csv headings with new array
     await fs.writeFile('stackoverflow.csv', keys.toString()+'\n'+arr, function (err) {
          if (err) throw err;
     });

}

// RECURSION
async function exec(url){
     pageNo = 1
     while(true){
          await stackoverflow(url.concat("&page=", pageNo));  // infinite recursion. will stop when $(elemSelector) is not found.
          pageNo += 1;
     }
}


module.exports = exec;
