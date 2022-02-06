const childProcess = require('child_process');
const fs = require('fs');

const result = childProcess.execSync('find node_modules/react-native-ui-lib/src -name "*api.json"');
const apis = result.toString().trim().split('\n');

const components = apis.map(filePath => {
  const file = fs.readFileSync(filePath);
  const api = JSON.parse(file.toString());
  return api;
});

let output = {};
if (components) {
  components.forEach(component => {
    const object = {};
    const name = component.name;
    object.prefix = name.charAt(0).toLowerCase() + name.slice(1);
    object.description = component.description;
    object.body = component.snippet;

    output[component.name] = object;
  });
  fs.writeFileSync(`snippets/snippets.code-snippets`, JSON.stringify(output));
}