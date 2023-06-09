# cloudemoticon-web

Cloud Emoticon as a universal web application

## Prereqs
* `Node.js`
* `yarn`
* [Additional dependencies for running iOS/Android apps](https://capacitor.ionicframework.com/docs/getting-started/dependencies/)

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

## Sync webapp and open iOS project
```bash
yarn open-ios
```

## Sync webapp and open Android project
```bash
yarn open-android
```

## Sync webapp and open Electron project
```bash
yarn open-electron
```

## Frameworks
* The project is bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
* The universal (e.g. iOS/Android) capability is backed by [Capacitor](https://capacitor.ionicframework.com/)
