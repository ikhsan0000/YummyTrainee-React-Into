import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import Wrapper from './Wrapper';

const CreateProduct = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [redirect, setRedirect] = useState(false)


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        let registerObj = {
            name: name,
            description: description,
            image: image        
        }
        fetch('http://localhost:8000/products',{
            method: 'post',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(registerObj)
        }).then((res) => {console.log(registerObj); console.log(res)
        }).then(() => {setRedirect(true)})
        
    }

    if(redirect)
    {
        return <Redirect to={'/products'}/>
    }

    return (
        <Wrapper>
        <div>
            <main className="form-signin mt-5">
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-4 fw-normal">Create New Products</h1>
                        <div className="form-floating">
                        <input className="form-control mb-2" id="floatingFirstName" placeholder="John" 
                        onChange={ (e) => { setName(e.target.value) }}/>
                        <label htmlFor="floatingFirstName">Product's Name</label>
                        </div>

                        <div className="form-floating">
                        <textarea className="form-control mb-2" id="floatingLastname" placeholder="Doe"
                        onChange={ (e) => { setDescription(e.target.value) }} />
                        <label htmlFor="floatingLastName">Description</label>
                        </div>

                        <label className="mb-2">Upload Image Here:</label>
                        <div className="input-group">
                            <input type="file" className="form-control" value={image}
                            onChange={ (e) => { setImage(e.target.value) }}/>    
                            <ImageUpload uploaded={setImage} />
                        </div>
                        <button className="w-100 btn btn-sm btn-secondary mt-4" type="submit">Add new product</button>
                    </form>
                    </main>
        </div>
        </Wrapper>
    );
};

export default CreateProduct;