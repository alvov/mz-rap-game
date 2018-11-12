import "url-search-params-polyfill";
import "@babel/polyfill";

import * as React from "react";
import ReduxThunk from 'redux-thunk'
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { combinedReducers } from "./ducks";
import { setLoops } from "./ducks/loops";
import { setCategories } from "./ducks/categories";
import { setNews } from "./ducks/news";
import { setShots } from "./ducks/shots";
import { App } from "./App";
import { categories, loops, news, shots } from "./data";
import * as styles from "./index.css";

const store = createStore(
  combinedReducers,
  applyMiddleware(ReduxThunk)
);

// set initial store
store.dispatch(setCategories(categories));
store.dispatch(setLoops(loops));
store.dispatch(setNews(news));
store.dispatch(setShots(shots));

let rootNode = document.getElementById("rap_root");

if(!rootNode) {
  rootNode = document.createElement("div");
  rootNode.className = styles.rootContainer;
  const body = document.body;
  if (body !== null) {
    body.appendChild(rootNode);
  }
}

const renderApp = (Component) => {
  if (rootNode) {
    render(
      <Provider store={store}>
        <Component/>
      </Provider>,
      rootNode
    );
  }
};

renderApp(App);

if (module.hot !== undefined) {
    module.hot.accept("./App", () => {
        renderApp(App);
    });
}
