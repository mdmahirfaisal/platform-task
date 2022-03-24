import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='w-3/5 flex flex-col mx-auto'>
            <h1 className='text-5xl my-12 text-red-500'>404 Page not found</h1>
            <h1><Link to="/dashboard">
                <Button color='secondary' variant='contained'>Back To Home</Button>
            </Link></h1>
        </div>
    );
};

export default NotFound;