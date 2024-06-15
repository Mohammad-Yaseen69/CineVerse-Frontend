import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { BASE_URL } from "../constant"
import toast from "react-hot-toast"


const API = axios.create({
    baseURL: `${BASE_URL}/api/v1/`,
    withCredentials: true
})

const initialState = {
    user: null,
    isLoggedIn: false,
    loading: true,
    expiresIn : null
}

export const createAccount = createAsyncThunk("register", async (data) => {
    console.log(data)
    try {
        toast.loading("Creating Account..." , {id : "auth"})
        const response = await API.post("users", data)
        console.log(response.data)
        toast.success(response.data?.message , {id : "auth"})
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong" , {id : "auth"})
        throw error.response?.data?.message
    }
})

export const loginUser = createAsyncThunk("login", async (data) => {
    try {
        const response = await API.post("users/login", data)
        console.log(response.data)
        toast.success(response.data?.message, {id : "auth2"})
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong" , {id : "auth2"})
        throw error.response?.data?.message
    }
})

export const logoutUser = createAsyncThunk("logout", async () => {
    try {
        const response = await API.post("users/logout")
        console.log(response.data)
        toast.success(response.data?.message)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        throw error.response?.data?.message
    }
})

export const getUser = createAsyncThunk("getUser", async () => {
    try {
        const response = await API.get("users")
        console.log(response.data)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        throw error.response?.data?.message
    }
})

export const refreshAccessToken = createAsyncThunk("refreshAccessToken", async () => {
    try {
        const response = await API.post("users//refresh-token")
        console.log(response.data)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        throw error.response?.data?.message
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state) => {
                state.loading = true
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.data
                state.isLoggedIn = false
            })
            .addCase(createAccount.rejected, (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.data
                state.isLoggedIn = true
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.data?.user
                state.expiresIn = action.payload?.data?.expiresIn
                state.isLoggedIn = true
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = null
                state.isLoggedIn = false
            })
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(refreshAccessToken.pending, (state) => {
                state.loading = true
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload?.data
                state.isLoggedIn = true
            })
            .addCase(refreshAccessToken.rejected), (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            }
    }
})


export default userSlice.reducer