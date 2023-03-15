import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/reset.css";

//redux
import { Provider } from "react-redux";

// version ใหท่ใช้ไม่ได้
//import { legacy_createStore as createStore } from "redux";
//* ใช้เวอร์ชั่นนี้ ติดตั้งด้วยละ
import {configureStore} from '@reduxjs/toolkit'


import { composeWhitDevTools } from "redux-devtools-extension";

import RootReducer from "./components/reducers/index";

import combineReducers from './components/reducers/index'



const store = configureStore({ reducer: combineReducers }, composeWhitDevTools);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</React.StrictMode>
);
