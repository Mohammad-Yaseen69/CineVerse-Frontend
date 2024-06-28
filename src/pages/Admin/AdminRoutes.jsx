import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast from 'react-hot-toast'

const AdminRoutes = () => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    console.log(user?.isAdmin)
    useEffect(() => {
        if (user) {
            if (!user?.isAdmin) {
                toast.error("You are not the admin");
                navigate("/login");
            }
        }
    }, [user, navigate]);

    return user?.isAdmin ? <Outlet /> : null;
}

export default AdminRoutes