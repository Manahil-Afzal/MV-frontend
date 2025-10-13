// import React from 'react'
// import ReactDOM from 'react-dom/client'
// // import reportWebVitals from "./reportWebVitals";
// import { Provider } from 'react-redux'
// import store from './redux/store.js'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// )
// // reportWebVitals();





import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
);
