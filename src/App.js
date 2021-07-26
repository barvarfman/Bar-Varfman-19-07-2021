import React from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './history';
import './styles/style.scss'
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { FavoritePage } from './pages/FavoritePage/FavoritePage.jsx';
import  {HeaderApp}  from './cmps/HeaderApp/HeaderApp.jsx';

function App() {
  return (
    <div className="App">
      <div id="background-wrap">
        <div class="x1">
          <div class="cloud"></div>
        </div>

        <div class="x2">
          <div class="cloud"></div>
        </div>

        <div class="x3">
          <div class="cloud"></div>
        </div>

        <div class="x4">
          <div class="cloud"></div>
        </div>

        <div class="x5">
          <div class="cloud"></div>
        </div>
      </div>
      <Router history={history}>
        <HeaderApp></HeaderApp>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/favoritePage" component={FavoritePage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
