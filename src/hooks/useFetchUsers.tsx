
import React, { useEffect } from 'react';

const useFetchUsers = () => {

    useEffect(() => { 
        fetch('http://localhost:8000/users', {method: 'GET'})
    })
    return ();
};

export default useFetchUsers;