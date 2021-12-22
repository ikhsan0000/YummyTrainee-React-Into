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

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            </input>
            <div className="navbar-nav">
                {loggedIn == false &&   <div className="nav-item text-nowrap">
                                            <a className="nav-link px-3" href="/login">Sign In</a>
                                        </div>}
                {loggedIn == true &&   <div className="nav-item text-nowrap">
                                            <a className="nav-link px-3" href="#">Sign out</a>
                                        </div>}
                
            </div>
        </header>
    )

}

export default Nav;