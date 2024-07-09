import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./userslice";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
}


export const addReview = createAsyncThunk("review/add", async ({review , mediaId}) => {
    try {
        toast.loading("Adding Review", { id: "review" })
        const response = await API.post(`reviews/${mediaId}`, {review})
        toast.success("Review Added", { id: "review" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message, { id: "review" })
        throw error
    }
})


export const deleteReview = createAsyncThunk("review/delete", async ({ reviewId }) => {
    try {
        toast.loading("Deleting Review", { id: "review" })
        const response = await API.delete(`reviews/${reviewId}`)
        toast.success("Review Deleted", { id: "review" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message, { id: "review" })
        throw error
    }
})

export const editReview = createAsyncThunk("review/edit", async ({ data, id }) => {
    try {
        toast.loading("Editing Review", { id: "review" })
        const response = await API.patch(`reviews/${id}`, data)
        toast.success("Review Edited", { id: "review" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message, { id: "review" })
        throw error
    }
})

export const listReviews = createAsyncThunk("review/list", async () => {
    try {
        toast.loading("Loading Reviews", { id: "review" })
        const response = await API.get(`reviews`)
        toast.success("Reviews Loaded", { id: "review" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message, { id: "review" })
        throw error
    }
})

export const likeReview = createAsyncThunk("review/like", async ({ id }) => {
    try {
        const response = await API.patch(`reviews/${id}/like`)
        toast.success(response.data.message, { id: "review" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message, { id: "review" })
        throw error
    }
})

export const dislikeReview = createAsyncThunk("review/dislike", async ({ id }) => {
    try {
        const response = await API.patch(`reviews/${id}/dislike`)
        toast.success(response.data.message, { id: "review" })
        return response.data
    } catch (error) {
        toast.error(error.response?.data?.message, { id: "review" })
        throw error
    }
})

const reviewSlice = createSlice({
    name: "review",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(addReview.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(editReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(editReview.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(editReview.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(listReviews.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(listReviews.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(listReviews.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(likeReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(likeReview.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(likeReview.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(dislikeReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(dislikeReview.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(dislikeReview.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default reviewSlice.reducer