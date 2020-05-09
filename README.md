# React Boilerplate

React+Flow-type+Eslint

## Installation

`yarn install`

## Start

`yarn start`


Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Flow-type

check types `yarn flow`

to create stub of some modules if you have error like 'Flow can not resolve <modulename>'

run: `flow-typed create-stub <modulename>`


## Config for VS code

```
{
    // Format a file on save. A formatter must be available, the file must not be auto-saved, and editor must not be shutting down.
    "editor.formatOnSave": false,
    // Support using flow through your node_modules folder, WARNING: Checking this box is a security risk. When you open a project we will immediately run code contained within it.
    "flow.useNPMPackagedFlow": true,
    // Enable/disable JavaScript validation. (For Flow)
    "javascript.validate.enable": false,
    // Enable/disable default JavaScript formatter (For Prettier)
    "javascript.format.enable": true,
    // Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
    "prettier.eslintIntegration": true,
    "eslint.autoFixOnSave": true,
    "eslint.alwaysShowStatus": true,
    "languageTool.language":"en"
}
```
## Build

`yarn build`

## Available Scripts

In the project directory, you can run:

### `yarn start`


### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
