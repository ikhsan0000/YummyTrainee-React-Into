import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { User } from "../models/User";

const Users = () => {

  const [users, setUsers]:any = useState(null)
  const [page, setPage] = useState(1);

  const handleDelete = (id:number) => {
    if(window.confirm('Are you sure you want to delete this'))
    {
      fetch(`http://localhost:8000/users/${id}`, {
              method: 'DELETE',
          })
      setUsers(users.filter((user: User) => user.id !== id))
    }
  }
  
  const handlePagination = (option:string) => {
    if(option == 'next')
    {
      setPage(page+1)
    }
    else
    {
      if(page !== 1)
      {
        setPage(page-1)
      }
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8000/users?_page=${page}&limit=10`, {
      method: 'GET',
    }).then((response) => {
      return response.json()
    }).then((data) => {setUsers(data)})

  }, [page])


        return(
          <Wrapper>
          
          {!users && <div className="center-flex">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}

          {users && <section>
            
            
            <Link to={'/users/create'} type="button" className="btn btn-sm btn-secondary mt-3 mb-1">
            <i className="bi bi-plus-square-dotted"></i>
            Add User
          </Link>

            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">#id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {users && users.map((user: User) =>(
                        <tr>
                          <td>{user.id}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                              <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-success" >
                                <i className="bi bi-pencil-square"></i>
                                Edit
                              </Link>
                            
                              <button className="btn btn-sm btn-outline-danger" onClick={() => {handleDelete(user.id)} }>
                                <i className="bi bi-trash-fill"></i>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button onClick={() => {handlePagination('prev')}} type="button" className="btn btn-sm btn-outline-secondary">Prev</button>
                <button onClick={() => {handlePagination('next')}} type="button" className="btn btn-sm btn-outline-secondary">Next</button>
              </div>
          
          </section>}
          
          
          </Wrapper>
          
        );
    }

export default Users;


