const packageJson = require('./package.json');
const fs = require('fs');
const path = require('path');

const version = packageJson['version'];
console.log(`Syncing to version ${version}`);

console.log("Syncing Electron version")
const electronPackageJsonPath = path.join('electron', 'package.json');
const electronPackageJson = JSON.parse(fs.readFileSync(electronPackageJsonPath, 'utf-8'))
electronPackageJson['version'] = version
fs.writeFileSync(electronPackageJsonPath, JSON.stringify(electronPackageJson, null, 2))
