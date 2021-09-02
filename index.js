const makeTruthTable = require('./src/makeTruthTable');

const table = makeTruthTable(process.argv[2] || 'A + C * (B + C * E)');
console.log(table)