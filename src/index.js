import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App';
import { unregister } from './registerServiceWorker';
import './index.css';
import packageJson from '../package.json';

window.ceVersion = packageJson.version;
ReactDOM.render(<App />, document.getElementById('root'));
unregister();
