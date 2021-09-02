const parse = require('./logicToCalc');
const alpha = require('./methods/alpha');

function binaryCombos(n) {
  var result = [];
  for (y = 0; y < Math.pow(2, n); y++) {
    var combo = [];
    for (x = 0; x < n; x++) {
      //shift bit and and it with 1
      if ((y >> x) & 1)
        combo.push(1);
      else
        combo.push(0);
    }
    result.push(combo);
  }
  return result;
}

function toStrData(arr) {
  let newarr = '';
  for (let i = 0; i < arr.length; i++) {
    newarr += alpha[i] + ':' + arr[i];
  }
  return newarr;
}

module.exports = function makeTable(str) {

  let signals = [];
  for (let i = 0; i < str.length; i++) {
    if (signals.indexOf(str[i]) === -1 && alpha.indexOf(str[i]) !== -1) {
      signals.push(str[i]);
    }
  }
  let len = signals.length;

  let possibilities = binaryCombos(len);
  let table = [];
  for (let i = 0; i < possibilities.length; i++) {
    table.push({
      input: possibilities[i],
      output: parse(str, toStrData(possibilities[i]))
    })
  }
  return table;
}