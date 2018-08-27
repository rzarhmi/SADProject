import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise'
import App from './App'
import UserNavBar from './components/user/user-navbar'

import reducers from './reducers/index';

// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store  = createStore(reducers,     window.devToolsExtension ? window.devToolsExtension() : f => f
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
// registerServiceWorker();
