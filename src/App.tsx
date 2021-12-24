import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import Roles from './pages/Roles';
import Products from './pages/Products';
import CreateProduct from './components/CreateProducts';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
          <Route path={'/'} component={Dashboard} exact />
          <Route path={'/register'} component={Register} exact />
          <Route path={'/login'} component={Login} exact />
          <Route path={'/users'} component={Users} exact />
          <Route path={'/users/create'} component={CreateUser} exact />
          <Route path={'/users/:id/edit'} component={EditUser} exact />
          <Route path={'/roles'} component={Roles} exact />
          <Route path={'/products'} component={Products} exact />
          <Route path={'/products/create'} component={CreateProduct} exact />
      </BrowserRouter>
    </div>
  );
}

export default App;
