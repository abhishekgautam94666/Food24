import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const OwnerRoute = ({ children }) => {

    const { userData } = useSelector(state => state.user)
    if (!userData) {
        return <Navigate to="/signin" replace />
    }

    if(userData.role !== "owner") {
        return <Navigate to="/" replace />
    }

    return children
}

export default OwnerRoute