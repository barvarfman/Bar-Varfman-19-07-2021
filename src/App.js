import React from 'react';
import { Router, Switch, Route } from 'react-router';
import history from './history';
import './styles/style.scss'
import { HomePage } from './pages/HomePage/HomePage.jsx';
import { FavoritePage } from './pages/FavoritePage/FavoritePage.jsx';
import  {HeaderApp}  from './cmps/HeaderApp/HeaderApp.jsx';
import {Cloud} from "./cmps/Cloud/Cloud.jsx"
function App() {
  return (
    <div className="App">
      <Cloud/>
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
