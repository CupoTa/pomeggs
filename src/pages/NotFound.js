import React from 'react';
import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='notfound'>
            <h1>404 NOT FOUND</h1>
            <Link className='notfound_link' to="/">HOME</Link>
        </div>
    );
};

export default NotFound;