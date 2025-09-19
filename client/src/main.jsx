import React from "react";
import ReactDOM from "react-dom/client"; 
import {Provider} from 'react-redux';
import Store from './redux/store.js';
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));


 ReactDOM.render(
     <Provider store= {Store}>
          <App/>
     </Provider>,
    document.getElementById('root')
 );







