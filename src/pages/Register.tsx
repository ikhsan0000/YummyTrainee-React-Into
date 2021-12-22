import axios from 'axios';
import React, { Component, SyntheticEvent } from 'react'
import { Redirect } from 'react-router-dom';

export default class Register extends Component {
    
    firstName =  '';
    lastName =  '';
    email =  '';
    password =  '';
    registerObj = {};

    state = { redirect: false }

    handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        this.registerObj = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
        }

        // const response = await axios({
        //     method: 'POST',
        //     url: 'http://localhost:8000/api/register',
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     data: this.registerObj
        // })

        fetch('http://localhost:8000/users',{
            method: 'post',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(this.registerObj)
        }).then((res) => {console.log(this.registerObj); console.log(res)} )
        .then(() => this.setState({redirect: true}))
        
        
    }
    
    render() {

        if(this.state.redirect)
        {
            return <Redirect to={'/login'} />
        }

        return (
            <div className="text-center register-page">
                <main className="form-signin">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-4 fw-normal">Register Here</h1>
                        <div className="form-floating">
                        <input className="form-control mb-2" id="floatingFirstName" placeholder="John" 
                        onChange={ (e) => { this.firstName = e.target.value }}/>
                        <label htmlFor="floatingFirstName">First Name</label>
                        </div>

                        <div className="form-floating">
                        <input className="form-control mb-2" id="floatingLastname" placeholder="Doe"
                        onChange={ (e) => { this.lastName= e.target.value }} />
                        <label htmlFor="floatingLastName">Last Name</label>
                        </div>

                        <div className="form-floating">
                        <input className="form-control mb-2" id="floatingInput" placeholder="name@example.com" 
                        onChange={ (e) => { this.email = e.target.value }}/>
                        <label htmlFor="floatingInput">Email address</label>
                        </div>

                        <div className="form-floating">
                        <input type="password" className="form-control mb-2" id="floatingPassword" placeholder="Password" 
                        onChange={ (e) => { this.password = e.target.value }}/>
                        <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary mt-4" type="submit">Register</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                    </form>
                    </main>

            </div>
        )
    }
}
