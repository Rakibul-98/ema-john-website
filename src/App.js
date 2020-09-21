import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import ManageCart from './components/Manage/ManageCart';
import NoMatch from './components/No match/NoMatch';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop/>
          </Route>
          <Route path="/review">
             <Review/>
          </Route>
          <PrivateRoute path="/manage">
              <ManageCart/>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
              <Shipment/>
          </PrivateRoute>
          <Route path="/login">
              <Login/>
          </Route>
          <Route exact path="/">
              <Shop/>
          </Route>
          <Route path='/product/:productKey'>
               <ProductDetails/>
          </Route>
          <Route path="*">
              <NoMatch/>
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
