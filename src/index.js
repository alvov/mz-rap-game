import * as React from "react";
import ReduxThunk from 'redux-thunk'
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { combinedReducers } from "./ducks";
import { setLoops } from "./ducks/loops";
import { setCategories } from "./ducks/categories";
import { setNews } from "./ducks/news";
import { App } from "./App";
import { categories, loops, news } from "./data";
import { generatePlayList, getRecordFromUrl, validateLoopId } from "./components/Player/utils";
import * as styles from "./index.css";

const store = createStore(
  combinedReducers,
  applyMiddleware(ReduxThunk)
);

// valid ids are required to be able to create a share link
loops.forEach(({ id }) => validateLoopId(id));

// set initial store
store.dispatch(setCategories(categories));
store.dispatch(setLoops(loops));
store.dispatch(setNews(news));

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
