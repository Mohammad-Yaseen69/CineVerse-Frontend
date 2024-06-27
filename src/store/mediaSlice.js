import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "./userslice";
import toast from "react-hot-toast"


const initialState = {
    loading: false,
}

export const addMedia = createAsyncThunk(async (data) => {
    try {
        toast.loading("Creating Media...", { id: "media" })
        const response = await API.post("media", data)
        toast.success(response.data?.message, { id: "media" })
        return response.data
    } catch (error) {
        toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" })
        throw error
    }
})


export const deleteMedia = createAsyncThunk(async ({ id }) => {
    try {
        toast.loading("Deleting Media", { id: "media" })
        const response = await API.delete(`media/${id}`)
        toast.success(response.data?.message, { id: "media" })
        return response.data
    } catch (error) {
        toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" })
        throw error
    }
})

export const getAllMedia = createAsyncThunk(async () => {
    try {
        toast.loading("Loading..", { id: "media" })
        const response = await API.get(`media`)
        toast.success(response.data?.message, { id: "media" })
        return response.data
    } catch (error) {
        toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" })
        throw error
    }
})

export const getMedia = createAsyncThunk(async ({ id }) => {
    try {
        toast.loading("Loading..", { id: "media" })
        const response = await API.get(`media/${id}`)
        toast.success(response.data?.message, { id: "media" })
        return response.data
    } catch (error) {
        toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" })
        throw error
    }
})

export const editMedia = createAsyncThunk(async (data, { id }) => {
    try {
        toast.loading("Loading..", { id: "media" })
        const response = await API.patch(`media/${id}`, data)
        toast.success(response.data?.message, { id: "media" })
        return response.data
    } catch (error) {
        toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" })
        throw error
    }
})

export const searchMedia = createAsyncThunk(async (query) => {
    try {
        toast.loading("Loading..", { id: "media" })
        const response = await API.patch(`media/search`, query)
        toast.success(response.data?.message, { id: "media" })
        return response.data
    } catch (error) {
        toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" })
        throw error
    }
})



const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addMedia.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addMedia.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(addMedia.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(deleteMedia.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteMedia.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(deleteMedia.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(getAllMedia.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllMedia.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getAllMedia.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(getMedia.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getMedia.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getMedia.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(editMedia.pending, (state) => {
            state.loading = true
        })
        builder.addCase(editMedia.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(editMedia.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(searchMedia.pending, (state) => {
            state.loading = true
        })
        builder.addCase(searchMedia.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(searchMedia.rejected, (state) => {
            state.loading = true
        })
    }
})

export default mediaSlice.reducer