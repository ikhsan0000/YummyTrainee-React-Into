import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Menu from './Menu'
import Nav from './Nav'

const Wrapper = (props: any) => {
    const [redirect, setRedirect] = useState(false)

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
        if (!getCookie('login'))
        {
            setRedirect(true)
        }
    }, [])

    if (redirect) {
        return <Redirect to='/login' />
    }

    return (
        <>
            <Nav />
            <div className="container-fluid">
            <div className="row">
                <Menu />
                
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {props.children}
                </main>
            </div>
            </div>  
        </>
    )

}

export default Wrapper