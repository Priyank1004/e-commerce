import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponet = () => {
    console.log("Data")
    const auth = localStorage.getItem('user');
    return (
        auth ? <Outlet /> : <Navigate to="/signup" />
    )
}

export default PrivateComponet;
