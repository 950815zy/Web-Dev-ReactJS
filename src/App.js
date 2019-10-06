import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './App.css';
import Auth from './Container/Auth/Auth'; 
import Signup from './Container/Signup/Signup'
import searchPage from './Container/SearchPage/searchPage'
import product from './Container/ProductList/product'

class App extends Component {
  render() {
    let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/signup" component={Signup} />
      <Route path="/search" component={searchPage} />
      <Route path="/product" component={product} />
      <Redirect to="/auth" />
    </Switch>  
    );  
  return (
    <div className="App" style={{ height: '100vh' }}>
      {routes}
    </div>
  );
  }
}

export default App;
