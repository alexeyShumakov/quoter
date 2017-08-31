import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import RootContainer from "./containers/RootContainer";
import store from './store/store';

import "./css/site.css";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Route path="/" component={Component}/>
        </Router>
        </Provider>
    </AppContainer>,
    document.getElementById('react-app')
  );
};

render(RootContainer);

if (module.hot) {
  module.hot.accept('./containers/RootContainer', () => { render(RootContainer) });
}