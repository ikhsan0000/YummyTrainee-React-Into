import React, { useEffect, useState } from "react";

const Nav = () =>  {

    const [loggedIn, setLoggedIn] = useState(false);

    function getCookie(cname:string) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

      useEffect(() => {
          if(getCookie('login'))
          {
              setLoggedIn(true);
          }
      }, [])

      const handleLogout = () => {
        document.cookie = `login= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
        document.cookie = `username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
        window.location.reload()
      }

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
           
            <div className="navbar-nav">
              
                {loggedIn == false &&   <div className="nav-item text-nowrap">
                                            <a className="nav-link px-3" href="/login">Sign In</a>
                                        </div>}
                {loggedIn == true &&   <span className="list-inline" style={{display: 'inherit'}}>
                                            <a className="nav-link px-3 list-inline-item">Hi, {getCookie('username')}</a>
                                            <a onClick={handleLogout} className="nav-link px-3 list-inline-item">Sign out</a>
                                        </span>}
            </div>
        </header>

    )

}

export default Nav;