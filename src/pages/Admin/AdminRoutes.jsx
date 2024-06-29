import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from 'react-hot-toast'

const AdminRoutes = () => {
    const user = useSelector(state => state.user.user)
    const loading = useSelector(state => state.user.loading)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            if (!user?.isAdmin && !user) {
                toast.error("You are not the admin");
                navigate("/login");
            }
        }
    }, [user, navigate]);

    return user?.isAdmin ? <Outlet /> : null;
}

export default AdminRoutes