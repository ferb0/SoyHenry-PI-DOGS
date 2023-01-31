import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';

import './global/GlobalStyle.css';

// import Principal from './componets/Principal/Principal.jsx';
import Principal from './MaterialUIComponents/Principal.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Principal />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);