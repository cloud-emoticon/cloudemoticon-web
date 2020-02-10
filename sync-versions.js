const packageJson = require('./package.json');
const fs = require('fs');

const version = packageJson['version'];
const vercode = packageJson['vercode'];
console.log(`Syncing to version ${version} and vercode ${vercode}`);

console.log("Syncing Android");
const gradlePropertiesPath = './android/app/gradle.properties';
fs.writeFileSync(gradlePropertiesPath,`versionName=${version}
versionCode=${vercode}`);
