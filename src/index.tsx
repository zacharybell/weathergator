import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

const body = document.getElementsByTagName('BODY')[0];
const root = document.createElement('div');

body.prepend(root);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
);
