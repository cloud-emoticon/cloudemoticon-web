# cloudemoticon-web

Cloud Emoticon as a universal web application

## Prereqs
* `Node.js`
* `npm` and `yarn`

## Prepare
```bash
yarn install
```

## Run as webapp
```bash
yarn start
```

## Build webapp
```bash
yarn build
# Then find production site under build/
```

## Sync webapp to Capacitor apps
```bash
yarn sync-cap
```

## Sync webapp and open Electron project
Make sure run this first (only needed once)
```bash
cd electron && npm install
```

Then run
```bash
yarn open-electron
```

## Frameworks
* The web project is bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
* Electron desktop version is provided by [Capacitor](https://capacitor.ionicframework.com/)
