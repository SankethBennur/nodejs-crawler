const fs = require('fs');
var jsonArray = [];


function convertToCSV(arr) {
     const array = [Object.keys(arr[0])].concat(arr)

     return array.map(it => {
          return Object.values(it).toString()
     }).join('\n')
}


module.exports = receive;