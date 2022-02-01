/**
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './src/store/index.js';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const Root = () => (
    <Provider store={Store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => App);
