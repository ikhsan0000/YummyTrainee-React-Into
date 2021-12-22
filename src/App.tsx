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

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
              <Route path={'/'} component={Dashboard} exact />
              <Route path={'/users'} component={Users} exact />
              <Route path={'/register'} component={Register} exact />
              <Route path={'/login'} component={Login} exact />
      </BrowserRouter>
    </div>
  );
}

export default App;
