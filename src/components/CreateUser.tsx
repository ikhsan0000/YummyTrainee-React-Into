import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Wrapper from './Wrapper';

const CreateUser = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let registerObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
        fetch('http://localhost:8000/users',{
            method: 'post',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(registerObj)
        }).then((res) => {console.log(registerObj); console.log(res)
        }).then(() => {setRedirect(true)})
        
    }

    if(redirect)
    {
        return <Redirect to={'/users'}/>
    }

    return (
        <Wrapper>
        <div>
            <main className="form-signin mt-5">
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-4 fw-normal">Create New User</h1>
                        <div className="form-floating">
                        <input className="form-control mb-2" id="floatingFirstName" placeholder="John" 
                        onChange={ (e) => { setFirstName(e.target.value) }}/>
                        <label htmlFor="floatingFirstName">First Name</label>
                        </div>

                        <div className="form-floating">
                        <input className="form-control mb-2" id="floatingLastname" placeholder="Doe"
                        onChange={ (e) => { setLastName(e.target.value) }} />
                        <label htmlFor="floatingLastName">Last Name</label>
                        </div>

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

                        <button className="w-100 btn btn-sm btn-secondary mt-4" type="submit">Register</button>
                    </form>
                    </main>
        </div>
        </Wrapper>
    );
};

export default CreateUser;