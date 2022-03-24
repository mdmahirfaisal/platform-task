import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';



const PrivateRoute = ({ children, ...rest }) => {
    let { user, loading } = useFirebase();
    let location = useLocation();
    if (loading) {
        return <CircularProgress sx={{ mt: 20 }} />
    };
    if (user.email) {
        return children;
    };
    return <Navigate to="/" state={{ from: location }} />
};

export default PrivateRoute;