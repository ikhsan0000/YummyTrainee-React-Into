import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Wrapper from './Wrapper';

const EditUser = (props: any) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [doneFetch, setDoneFetch] = useState(false)

    const userId = (props.match.params.id);

    useEffect(() => {
        fetch(`http://localhost:8000/users/${userId}`, {
          method: 'GET',
        }).then((response) => {
          return response.json()
        }).then((data) => {
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setEmail(data.email)
            setRole(data.role)
            setDoneFetch(true);
        })
    }, [])
    

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let registerObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role
        }
        fetch(`http://localhost:8000/users/${userId}`,{
            method: 'PATCH',
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
        {doneFetch &&
        
        <div>
            <main className="form-signin mt-5">
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-4 fw-normal">Edit for user: {firstName}</h1>
                    <div className="form-floating">
                    <input className="form-control mb-2" id="floatingFirstName" value={firstName} 
                    onChange={ (e) => { setFirstName(e.target.value) }}/>
                    <label htmlFor="floatingFirstName">First Name</label>
                    </div>

                    <div className="form-floating">
                    <input className="form-control mb-2" id="floatingLastname" value={lastName}
                    onChange={ (e) => { setLastName(e.target.value) }} />
                    <label htmlFor="floatingLastName">Last Name</label>
                    </div>

                    <div className="form-floating">
                    <input className="form-control mb-2" id="floatingInput" value={email}
                    onChange={ (e) => { setEmail(e.target.value) }}/>
                    <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option selected value="admin">{role}</option>
                        <option value="editor">editor</option>
                        <option value="viewer">viewer</option>
                    </select>
                    <label htmlFor="floatingSelect">Role</label>
                    </div>

                    <button className="w-100 btn btn-sm btn-success mt-4" type="submit">Edit</button>
                </form>
            </main>
        </div>
        }
    
    </Wrapper>
    );
};

export default EditUser;