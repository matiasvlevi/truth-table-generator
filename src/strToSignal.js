const ifM = require('./methods/ifMultiple');
const removeIgnored = require('./methods/removeIgnored');
const { operators, ignored } = require('../settings/settings.js');

module.exports = function strToSignal(str) {

  let signal = [];

  // remove all spaces
  str = removeIgnored(str, [/ /gm]);
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ':') {
      signal.push({
        value: str[i + 1],
        variable: str[i - 1]
      });
    }
  }

  return signal;
}