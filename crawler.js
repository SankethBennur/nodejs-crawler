const express = require('express');
const router= express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { json } = require('express/lib/response');
// const controller = require('./controller.js');


async function stackoverflow() {
     let jsonArray = [];
     try {
          const siteUrl = "https://stackoverflow.com/questions?tab=votes";
          const { data } = await axios({
               method: 'GET',
               url: siteUrl,
          });
          const $ = cheerio.load(data);
          
          // [may require a while loop if element doesn't exist. Stops recursion.]
          const elemSelector = $('.question-summary');
          // gets list of elements with class=question-summary

          $(elemSelector).each(function (parentIdx, parentElem) {
               var jsonObj = {};
               
               // [temporary]
               jsonObj.index = parentIdx;
               // jsonOutput.questionLink = "https://stackoverflow.com"+$(this).find(".summary").find("a").attr("href");
               jsonObj.questionLink = "https://stackoverflow.com"+$(parentElem).find(".summary").find("a").attr("href");
               jsonObj.upvotes = $(parentElem).find(".votes").find("strong").text();
               jsonObj.answers = $(parentElem).find(".status").find("strong").text();
               
               jsonArray.push(jsonObj);
          });
          
     }
     catch (error) {
          console.log(error);
     }

     return(jsonArray);
     // send a response with express
     // console.log(jsonArray);

}


router.get('/fetch', async function(req, res){
     try{
          const result = await stackoverflow();

          res.status(201).json({result});
     }
     catch(error){
          res.status(403).json({error: error.toString()});
     }
});


module.exports = router;