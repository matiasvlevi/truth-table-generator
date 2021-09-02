const ifM = require('./methods/ifMultiple');
const removeIgnored = require('./methods/removeIgnored');

module.exports = function strToLogic(operation, operators) {

  let signals = [];
  let logic = [];
  let paranthesesIndex = 0;
  //let passed = 0;
  for (let i = 0; i < operation.length; i++) {
    let char = operation[i];
    if (char === '(') {
      paranthesesIndex++;
    } else if (char === ')') {
      paranthesesIndex--;
    }

    let isOperator = ifM(char, operators);
    let isMult = 0;

    if (isOperator) {
      let passed = 0;
      let input1 = operation[i - 1];
      while (input1 === ')' || input1 === '(') {
        input1 = operation[i - 1 - passed];

        passed--;

      }
      passed = 0;
      let input2 = operation[i + 1];
      while (input2 === '(' || input2 === ')') {
        input2 = operation[i + 1 + passed];
        passed++;

      }

      if (char === '*') {
        isMult = 0.5;
      }

      let priority = paranthesesIndex + isMult;
      if (char === '+') {
        op = (a, b) => (a + b);
      } else if (char === '*') {
        op = (a, b) => (a * b)
      } else {
        op = (x, y) => (x);
      }
      logic.push({
        i1: input1,
        i2: input2,
        operation: char,
        priority: priority,
        op: op
      });
    } else {
      signals.push(char);
    }

  }

  logic.sort((a, b) => {
    return b.priority - a.priority;
  });

  console.log(logic)
  return logic;
}