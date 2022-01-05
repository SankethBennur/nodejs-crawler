const fs = require('fs');

// function convertToCSV(arr) {
//      const array = [Object.keys(arr[0])].concat(arr)

//      return array.map(it => {
//           return Object.values(it).toString()
//      }).join('\n')
// }

var arr001 = [
     {
          index: 0,
          questionLink: 'https://stackoverflow.com/questions/2669690/why-does-google-prepend-while1-to-their-json-responses',
          upvotes: '4304',
          answers: '8'
     },
     {
          index: 1,
          questionLink: 'https://stackoverflow.com/questions/134845/which-href-value-should-i-use-for-javascript-links-or-javascriptvoid0',
          upvotes: '4297',
          answers: '55'
     },
     {
          index: 2,
          questionLink: 'https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json',
          upvotes: '4284',
          answers: '19'
     },
     {
          index: 3,
          questionLink: 'https://stackoverflow.com/questions/271526/avoiding-nullpointerexception-in-java',
          upvotes: '4260',
          answers: '65'
     },
     {
          index: 4,
          questionLink: 'https://stackoverflow.com/questions/388242/the-definitive-c-book-guide-and-list',
          upvotes: '4235',
          answers: '1'
     },
]

// let keys = ['a','b','c','d']

arr001 = arr001.map(it => {
     return Object.values(it).toString()
}).join('\n')

console.log(arr001);

// fs.appendFile('stackoverflow.csv', keys.toString()+'\n'+arr.toString(), function (err) {
//      if (err) throw err;
// });

// var arr002 = [];
// var i = 1;

// function recursive() {
//      arr002 = arr002.concat(i);
//      i++;
//      while (i <= 50) {
//           recursive()
//      }
//      return arr002;
// }

// // fs.writeFile('./stackoverflow.csv', '', function () { console.log('done') })

// // console.log(recursive());

// var result = arr001.filter(obj => {
//      return obj.questionLink === 'https://stackoverflow.com/questions/271526/avoiding-nullpointerexception-in-java'
// });

// // if(result[0]){
// //      console.log('exists')
// //      result[0].index += 100;  // manipulation
// // }
// // else{
// //      console.log('not exist')
// // }

// // console.log(arr001);