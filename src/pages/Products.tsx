import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { Product } from "../models/Product";

const Products = () => {

  const [products, setProducts]:any = useState(null)
  const [page, setPage] = useState(1);

  const handleDelete = (id:number) => {
    if(window.confirm('Are you sure you want to delete this'))
    {
      fetch(`http://localhost:8000/products/${id}`, {
              method: 'DELETE',
          })
      setProducts(products.filter((product: Product) => product.id !== id))
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
    fetch(`http://localhost:8000/products?_page=${page}&limit=10`, {
      method: 'GET',
    }).then((response) => {
      return response.json()
    }).then((data) => {setProducts(data)})

  }, [page])

    return (
        <Wrapper>

        {!products && <div className="center-flex">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>}

          {products && <section>
            
            
            <Link to={'/products/create'} type="button" className="btn btn-sm btn-secondary mt-3 mb-1">
            <i className="bi bi-plus-square-dotted"></i>
            Add Products
          </Link>

            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Id#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {products && products.map((product: Product) =>(
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td><img src={process.env.PUBLIC_URL + '/assets/' + product.image} width="100" alt="" /></td>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                              <Link to={`/users/${product.id}/edit`} className="btn btn-sm btn-outline-success" >
                                <i className="bi bi-pencil-square"></i>
                                Edit
                              </Link>
                            
                              <button className="btn btn-sm btn-outline-danger" onClick={() => {handleDelete(product.id)} }>
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
};

export default Products;