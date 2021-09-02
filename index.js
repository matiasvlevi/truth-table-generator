const parse = require('./src/makeTruthTable');

const table = parse('A + C * (B + C)');
console.log(table)