import React, {SyntheticEvent, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';

const Login = () => {
    
    const [redirect, setRedirect] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [fetched, setFetched] = useState(false);

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
        if (getCookie('login'))
        {
            setRedirect(true)
        }
    }, [])

    if (redirect) {
        return <Redirect to='/' />
    }
    

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // login logic
        await fetch('http://localhost:8000/users', {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data.filter((item: { email: string; }) => item.email == email)[0]
        }).then((data) => {
            if(data.email == email && data.password == password)
            {
                setLoginSuccess(true)
                document.cookie = "login=true;max-age=36000;"; 
                document.cookie = `email=${data.email};max-age=36000;`; 
            }
            else
            {
                console.log('credential invalid')
            }
        })
    }

    if(loginSuccess)
    {
       return <Redirect to={'/'}/>
    }
    
    return (

        <div className="text-center register-page">
            
            <main className="form-signin">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-4 fw-normal">Login</h1>
                <div className="form-floating">
                <input className="form-control mb-2" id="floatingInput" placeholder="name@example.com" 
                onChange={ (e) => { setEmail(e.target.value) }}/>
                <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                <input type="password" className="form-control mb-2" id="floatingPassword" placeholder="Password" 
                onChange={ (e) => { setPassword(e.target.value) }}/>
                <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary mt-4" type="submit">Login</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
            </main>

        </div>
    );
};

export default Login;