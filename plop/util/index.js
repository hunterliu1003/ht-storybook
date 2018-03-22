const fs = require('fs');
const path = require('path');

const componentNames = fs.readdirSync(path.resolve('components'));

const componentExists = comp => componentNames.indexOf(comp) > 0;

module.exports = {
  componentExists
};
