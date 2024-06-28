import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./userslice";
import toast from "react-hot-toast"



const initialState = {
    genres: [],
    loading: false
}


export const addGenre = createAsyncThunk("genre/add",async (data) => {
    try {
        toast.loading("Adding Genre", { id: "genre" })
        const response = await API.post("genres", data)
        toast.success("Genre Added", { id: "genre" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message)
        throw error.response?.data?.message
    }
})

export const deleteGenre = createAsyncThunk("genre/delete",async ({ id }) => {
    try {
        toast.loading("Deleting Genre", { id: "genre" })
        const response = await API.delete(`genres/${id}`)
        toast.success("Genre Deleted", { id: "genre" })
        console.log(response.data)
        return { id }
    } catch (error) {
        toast.error(error.response?.data?.message)
        throw error.response?.data?.message
    }
})

export const getAllGenre = createAsyncThunk("genre/getAll",async () => {
    try {
        toast.loading("Loading Genres", { id: "genre" })
        const response = await API.get("genres")
        toast.success("Genres Loaded", { id: "genre" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message)
        throw error.response?.data?.message
    }
})

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addGenre.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addGenre.fulfilled, (state, action) => {
            state.genres.push(action.payload?.data)
            state.loading = false
        })
        builder.addCase(addGenre.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteGenre.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteGenre.fulfilled, (state, action) => {
            state.genres = state.genres.filter((genre) => genre._id !== action.payload?.id)
            state.loading = false
        })
        builder.addCase(deleteGenre.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getAllGenre.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllGenre.fulfilled, (state, action) => {
            state.genres = [...action.payload?.data]
            state.loading = false
        })
        builder.addCase(getAllGenre.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default genreSlice.reducer