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
    expiresIn: null,
    userEmailForgotPassword: null,
    isVerified : false
}

export const createAccount = createAsyncThunk("register", async (data) => {
    try {
        toast.loading("Creating Account...", { id: "auth" })
        const response = await API.post("users", data)
        toast.success(response.data?.message, { id: "auth" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong", { id: "auth" })
        throw error.response?.data?.message
    }
})

export const loginUser = createAsyncThunk("login", async (data) => {
    try {
        const response = await API.post("users/login", data)
        toast.success(response.data?.message, { id: "auth2" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong", { id: "auth2" })
        throw error.response?.data?.message
    }
})

export const logoutUser = createAsyncThunk("logout", async () => {
    try {
        const response = await API.post("users/logout")
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
        let message =
            error.response?.data?.message.includes("Operation")
                || error.response?.data?.message.includes("ECONNRESET") ? "Server Error" : error.response?.data?.message

        message = error.response?.data?.message.includes("Unauthorized request") ? "Please Login" : error.response?.data?.message

        toast.error(message || "Something went wrong")
        throw message
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

export const forgotPassword = createAsyncThunk("forgotPassword", async (data) => {
    try {
        const response = await API.post("users/forgot-password", data)
        console.log(response.data)
        toast.success(response.data?.message)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        throw error.response?.data?.message
    }
})

export const verifyOtp = createAsyncThunk("verifyOtp", async (data) => {
    try {
        const response = await API.post("users/verify-otp", data)
        console.log(response.data)
        toast.success(response.data?.message)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        console.log(error.response?.data?.message)
    }
})

export const resetPassword = createAsyncThunk("resetPassword", async (data) => {
    try {
        const response = await API.put("users/reset-password", data)
        console.log(response.data)
        toast.success(response.data?.message)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        console.log(error.response?.data?.message)
    }
})

export const verification = createAsyncThunk("verification", async ({ userId, token }) => {
    try {

        const response = await API.get(`users/${userId}/verify/${token}`)
        console.log(response.data)
        toast.success(response.data?.message)
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
        console.log(error.response?.data?.message)
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
            .addCase(refreshAccessToken.rejected, (state) => {
                state.loading = false
                state.isLoggedIn = false
                state.user = null
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false
                state.userEmailForgotPassword = action.payload?.data?.email
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.loading = false
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(verifyOtp.rejected, (state) => {
                state.loading = false
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(resetPassword.rejected, (state) => {
                state.loading = false
            })
            .addCase(verification.pending, (state) => {
                state.loading = true
            })
            .addCase(verification.fulfilled, (state, action) => {
                state.loading = false
                state.isVerified = true
            })
            .addCase(verification.rejected, (state) => {
                state.loading = false
                state.isVerified = false
            })
    }
})


export default userSlice.reducer