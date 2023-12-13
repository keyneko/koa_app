const viewGenerator = require('./plop-templates/view')
const componentsGenerator = require('./plop-templates/components')
const miscGenerator = require('./plop-templates/misc')

module.exports = function(plop) {
  // Set helpers
  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
  plop.setHelper('upperCamelCase', (s0, s1) => capitalize(s0) + capitalize(s1));
  plop.setHelper('concat', (s0, s1) => s0 + s1);
  plop.setHelper('eq', (v1, v2) => v1 === v2);

  // Set generators
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('components', componentsGenerator)
  plop.setGenerator('misc', miscGenerator)
}
