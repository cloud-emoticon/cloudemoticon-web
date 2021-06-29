const packageJson = require('./package.json');
const fs = require('fs');
const path = require('path');

const version = packageJson['version'];
const vercode = packageJson['vercode'];
console.log(`Syncing to version ${version} and vercode ${vercode}`);

console.log("Syncing Android version");
const gradlePropertiesPath = path.join('android', 'app', 'gradle.properties');
fs.writeFileSync(gradlePropertiesPath,`android.versionName=${version}
android.versionCode=${vercode}`);

console.log("Syncing iOS version");
const projectPbxprojPath = path.join('ios', 'App', 'App.xcodeproj', 'project.pbxproj');
let projectPbxproj = fs.readFileSync(projectPbxprojPath, 'utf-8');
projectPbxproj = projectPbxproj.replace(
  /CURRENT_PROJECT_VERSION = [0-9]*;/g,
  `CURRENT_PROJECT_VERSION = ${vercode};`
);
projectPbxproj = projectPbxproj.replace(
  /MARKETING_VERSION = [0-9.]*;/g,
  `MARKETING_VERSION = ${version};`
);
fs.writeFileSync(projectPbxprojPath, projectPbxproj);

console.log("Syncing Electron version")
const electronPackageJsonPath = path.join('electron', 'package.json');
const electronPackageJson = JSON.parse(fs.readFileSync(electronPackageJsonPath, 'utf-8'))
electronPackageJson['version'] = version
fs.writeFileSync(electronPackageJsonPath, JSON.stringify(electronPackageJson, null, 2))
