import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import { User } from "../models/User";

const Nav = (props: {user: User}) =>  {


      const handleLogout = () => {
        document.cookie = `login= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
        document.cookie = `email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
        window.location.reload()
      }

    return (
      
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
           
          <div className="navbar-nav">    
            <span className="list-inline" style={{display: 'inherit'}}>
              <a className="nav-link px-3 list-inline-item">Hi, {props.user.firstName}</a>
              <a onClick={handleLogout} className="nav-link px-3 list-inline-item">Sign out</a>
            </span>
          </div>
        </header>

    )

}

const mapStateToProps = (state: {user:User}) => {
  return{
      user: state.user
  }
}

export default connect(mapStateToProps)(Nav); 