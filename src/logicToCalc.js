const { operators, ignored } = require('../settings/settings.js');
const strToLogic = require('./strToLogic');
const removeIgnored = require('./methods/removeIgnored');
const parseSignal = require('./strToSignal');
const binary = require('./methods/binary');
const alpha = require('./methods/alpha');
const ifM = require('./methods/ifMultiple');


function toNum(str, values) {
  let newstr = str;
  for (let i = 0; i < values.length; i++) {
    while (newstr.indexOf(values[i].variable) !== -1) {
      newstr = newstr.replace(values[i].variable, values[i].value)
    }
  }
  return newstr;
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i;
  for (i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i);
  return indexes;
}

module.exports = function logicToCalc(str, values) {

  // remove all ignored chars
  str = removeIgnored(str, ignored);
  let result = 0;
  let logic = strToLogic(str, operators);

  // Add missing values with a default of 0
  for (let i = 0; i < logic.length; i++) {
    if (values.indexOf(logic[i].i1) === -1 && !ifM(logic[i].i1, operators)) {
      values += ' ' + logic[i].i1 + ':' + 0 + ' ';
    }
    if (values.indexOf(logic[i].i2) === -1 && !ifM(logic[i].i2, operators)) {
      values += ' ' + logic[i].i2 + ':' + 0 + ' ';
    }
  }

  let signal = parseSignal(values);



  let i = 0;
  let newstr = str;
  let oldvalues = values;
  while (logic.length >= 1) {


    let newValues = '';
    let letterIndex = 0;
    let c = logic[0];
    let i1 = 0;
    let i2 = 0;
    let v1 = '';
    let v2 = '';
    for (let s of signal) {
      console.log(s.variable, c.i1)
      if (s.variable === c.i1) {
        i1 = s.value;
        v1 = s.variable;

      } else if (s.variable === c.i2) {
        i2 = s.value;
        v2 = s.variable;
      }

    }
    result = binary(c.op(i1, i2));

    console.log('')
    console.log('Round ' + i)
    console.log(toNum(newstr, signal) + ' = ' + result);


    let regexStr = "" + v1 + "\\" + c.operation + v2 + "|" +
      v1 + "\\" + c.operation + "\\(" + v2 + "\\)" + "|" +
      "\\(" + v1 + "\\)" + "\\" + c.operation + "\\(" + v2 + "\\)" + "|" +
      "\\(" + v1 + "\\)" + "\\" + c.operation + v2;
    let reg = new RegExp(regexStr);
    console.log(reg)
    while (newstr.indexOf(alpha[letterIndex]) !== -1) {
      if (letterIndex >= 26) {
        letterIndex = 0;
      } else {
        letterIndex++;
      }
    }
    newstr = newstr.replace(reg, alpha[letterIndex]);



    let val1replace = v1 + ':' + i1;

    let val2replace = v2 + ':' + i2;

    for (let i = 0; i < oldvalues.length; i++) {
      let exp = oldvalues[i - 1] + ':' + oldvalues[i + 1];
      if (oldvalues[i] === ':' && newstr.indexOf(oldvalues[i - 1]) !== -1) {
        newValues += exp;
      }
    }
    if (getAllIndexes(newstr, v1).length < 1) {
      newValues = newValues.replace(val1replace, '');
    }
    if (getAllIndexes(newstr, v2).length < 1) {
      newValues = newValues.replace(val2replace, '');
    }
    if (newValues.indexOf(alpha[letterIndex]) === -1) {
      newValues += ' ' + alpha[letterIndex] + ':' + result;
    }
    oldvalues = newValues;
    signal = parseSignal(newValues);
    // remove all ignored chars
    newstr = removeIgnored(newstr, ignored);
    logic = strToLogic(newstr, operators);

    i++;
  }

  return result;


};