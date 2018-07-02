# React-Burger-Builder-App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.</br>
You can find the most recent version of this guide [here]3(https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Resolve Module Import Aliasing for Webpack, Jest, ESLint, and VS Code

### Webpack

- Create a new config webpack file: *./config/webpack.config.resolve.js*:

```javascript
  module.exports = {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, '../src/'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.join(__dirname, '../src/components'),
      '@constants': path.resolve(__dirname, '../src/constants'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@hoc': path.resolve(__dirname, '../src/hoc'),
      '@actions': path.resolve(__dirname, '../src/store/actions'),
      '@reducers': path.resolve(__dirname, '../src/store/reducers'),
      '@sagas': path.resolve(__dirname, '../src/store/sagas'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    },
  };
```

- Modify the *./config/webpack.config.dev.js* and *./webpack.config.prod.js* files

```javascript

...

const webpackConfigResolve = require('./webpack.config.resolve');

...


module.exports = {

  ...

  resolve: {
    ...

    alias: webpackConfigResolve.alias,
    extensions: webpackConfigResolve.extensions,
  }
}
```

### Jest

Add the *moduleNameMapper* property to the jest configuration in the *package.json*

```json
"moduleNameMapper": {
  "^@src(.*)$": "<rootDir>/src$1",
  "^@assets(.*)$": "<rootDir>/src/assets$1",
  "^@components(.*)$": "<rootDir>/src/components$1",
  "^@constants(.*)$": "<rootDir>/src/constants$1",
  "^@containers(.*)$": "<rootDir>/src/containers$1",
  "^@hoc(.*)$": "<rootDir>/src/hoc$1",
  "^@actions(.*)$": "<rootDir>/src/store/actions$1",
  "^@reducers(.*)$": "<rootDir>/src/store/reducers$1",
  "^@sagas(.*)$": "<rootDir>/src/store/sagas$1",
  "^@utils(.*)$": "<rootDir>/src/utils$1"
},
```

### ESLint

- install *eslint-plugin-import* and *eslint-import-resolver-webpack* modules:

```bash
npm i eslint-plugin-import eslint-import-resolver-webpack
```

- add webpack settings to to the *.eslintrc* config:

```json
"settings": {
  "import/resolver": {
    "webpack": {
      "config": "./config/webpack.config.dev.js"
    }
  }
}
```

- Add a default definition to NODE_ENV in *./config/env.js*

```javascript
const NODE_ENV = process.env.NODE_ENV || 'development';
```

### VS Code

Create a new config VS Code file: *.jsconfig.json*:

```javascript
{
  "compilerOptions": {
    "target": "es2017",
    "allowSyntheticDefaultImports": false,
    "baseUrl": "./",
    "paths": {
      "@src/*": ["src/*"],
      "@assets/*": ["src/assets/*"],
      "@components/*": ["src/components/*"],
      "@constants/*": ["src/constants/*"],
      "@containers/*": ["src/containers/*"],
      "@hoc/*": ["src/hoc/*"],
      "@actions/*": ["src/store/actions/*"],
      "@reducers/*": ["src/store/reducers/*"],
      "@sagas/*": ["src/store/sagas/*"],
      "@utils/*": ["src/utils/*"],
    }
  },
  "include": ["src"]
}
```

## Deploy build folder to the Firebase hosting

```bash
npx firebase deploy
```

Hosting url: [react-burger-builder-app](https://react-burger-builder-f06ca.firebaseapp.com)