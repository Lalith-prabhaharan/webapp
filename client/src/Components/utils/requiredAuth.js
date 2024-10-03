import React from 'react'
import { Navigate } from 'react-router-dom'
export const Requiredauth = (props) => {
    if(!localStorage.getItem("token")){
        return <Navigate to="/"></Navigate>
    }
    else{
        return props.children;
    }
}