import React from 'react';
import axios from 'axios';
 
function ImageUpload(props: {uploaded: (url:string) => void}) {

    const upload = async (files: FileList | null) => {
        if(files == null) {
        }
        else
        {
            console.log(files[0])
            const formData = new FormData();
            formData.append('image', files[0])
            
            const {data} = await axios.post(`/assets`, formData)
            props.uploaded(data.url);
        } 
    }

    return (
        <label className="btn btn-primary">Upload
            <input type="file" hidden onChange={ (e) => upload(e.target.files) }/>
        </label>
    );
}

export default ImageUpload;