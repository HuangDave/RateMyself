const fs = require('fs')
var util = require('util');
var log_file = fs.createWriteStream('./test/queries.log', {flags : 'w'});
var log_stdout = process.stdout;


exports.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
