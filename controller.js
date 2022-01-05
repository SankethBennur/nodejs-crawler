const fs = require('fs');

// function convertToCSV(arr) {
//      const array = [Object.keys(arr[0])].concat(arr)

//      return array.map(it => {
//           return Object.values(it).toString()
//      }).join('\n')
// }

var arr = [
     {
          index: 32,
          questionLink: 'https://stackoverflow.com/questions/2669690/why-does-google-prepend-while1-to-their-json-responses',
          upvotes: '4304',
          answers: '8'
     },
     {
          index: 33,
          questionLink: 'https://stackoverflow.com/questions/134845/which-href-value-should-i-use-for-javascript-links-or-javascriptvoid0',
          upvotes: '4297',
          answers: '55'
     },
     {
          index: 34,
          questionLink: 'https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json',
          upvotes: '4284',
          answers: '19'
     },
     {
          index: 35,
          questionLink: 'https://stackoverflow.com/questions/271526/avoiding-nullpointerexception-in-java',
          upvotes: '4260',
          answers: '65'
     },
     {
          index: 36,
          questionLink: 'https://stackoverflow.com/questions/388242/the-definitive-c-book-guide-and-list',
          upvotes: '4235',
          answers: '1'
     },
     {
          index: 37,
          questionLink: 'https://stackoverflow.com/questions/271526/avoiding-nullpointerexception-in-java',
          upvotes: '4260',
          answers: '65'
     },
]

let keys = ['a','b','c','d']

arr = arr.map(it => {
     return Object.values(it).toString()
}).join('\n')

console.log(arr);

// fs.appendFile('stackoverflow.csv', keys.toString()+'\n'+arr.toString(), function (err) {
//      if (err) throw err;
// });

// arr.forEach(function (i) {
//      // if(arr.includes(i.questionLink)) console.log(arr[arr.indexOf(i.questionLink)]);
//      // else i.count=1
//      if (arr.includes()) console.log(true)
// });

// console.log(arr.includes('4235'));