import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { Role } from '../models/Role';

const Roles = () => {

    const [roles, setRoles]:any = useState(null)

    const handleDelete = (id:number) => {
        if(window.confirm('Are you sure you want to delete this'))
        {
          fetch(`http://localhost:8000/roles/${id}`, {
                  method: 'DELETE',
              })
          setRoles(roles.filter((role: Role) => role.id !== id))
        }
      }

    useEffect(() => {
        fetch(`http://localhost:8000/roles`, {
          method: 'GET',
        }).then((response) => {
          return response.json()
        }).then((data) => {setRoles(data)})
    
      }, [])

    return (
        <Wrapper>

        {!roles && <div className="center-flex">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}

          <Link to={'/roles/create'} type="button" className="btn btn-sm btn-secondary mt-3 mb-1">
            <i className="bi bi-plus-square-dotted"></i>
            Add Roles
          </Link>
            <div>
                {roles && 
                
                <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#id</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {roles && roles.map((role:Role) => (
                        
                        <tr key={role.id}>
                            <td>{role.id}</td>
                            <td>{role.name}</td>
                            <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-success" >
                                <i className="bi bi-pencil-square"></i>
                                Edit
                                </Link>
                            
                                <button className="btn btn-sm btn-outline-danger" onClick={() => {handleDelete(role.id)} }>
                                <i className="bi bi-trash-fill"></i>
                                Delete
                                </button>
                            </div>
                            </td>
                        </tr>

                        ))
                        }
                    </tbody>
                </table>
                </div>

                }
            </div>
        </Wrapper>
        
        
    );
};

export default Roles;