import React, { Dispatch, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Menu from './Menu'
import Nav from './Nav'
import {connect} from 'react-redux'
import { User } from '../models/User'
import { setUser } from '../redux/actions/setUserAction'

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
        ( async () => {
            if (!getCookie('login'))
            {
                setRedirect(true)
            }
            else
            {
                await fetch(`http://localhost:8000/users/`, {
                    method: 'GET',
                }).then((response) => {
                    return response.json()
                }).then((data) => {
                    let filtered =  data.filter((item: any) => item.email == getCookie('email'))
                    return filtered[0]
                }).then((data) => {
                    props.setUser(new User(
                        data.id,
                        data.firstName,
                        data.lastName,
                        data.email,
                        data.role
                    ))
                })
            }
            
        })();
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

const mapStateToProps = (state: {user:User}) => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return{ 
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)