import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "./userslice";
import toast from "react-hot-toast"


const initialState = {
    loading: false,
}


export const addMedia = createAsyncThunk(
    "media/add",
    async (data) => {
        console.log(data)
        try {
            toast.loading("Creating Media...", { id: "media" });
            const response = await API.post("media", data);
            toast.success(response.data?.message, { id: "media" });
            return response.data;
        } catch (error) {
            toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" });
            throw error;
        }
    }
);

export const deleteMedia = createAsyncThunk(
    "media/delete",
    async ({ id }) => {
        try {
            toast.loading("Deleting Media", { id: "media" });
            const response = await API.delete(`media/${id}`);
            toast.success(response.data?.message, { id: "media" });
            return response.data;
        } catch (error) {
            toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" });
            throw error;
        }
    }
);

export const getAllMedia = createAsyncThunk(
    "media/getAll",
    async () => {
        try {
            const response = await API.get(`media`);
            return response.data;
        } catch (error) {
            toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" });
            throw error;
        }
    }
);

export const getMedia = createAsyncThunk(
    "media/get",
    async ({ id }) => {
        try {
            const response = await API.get(`media/${id}`);
            return response.data;
        } catch (error) {
            toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" });
            throw error;
        }
    }
);

export const editMedia = createAsyncThunk(
    "media/edit",
    async ({ id, data }) => {
        try {
            toast.loading("Loading..", { id: "media" });
            const response = await API.patch(`media/${id}`, data);
            toast.success(response.data?.message, { id: "media" });
            return response.data;
        } catch (error) {
            toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" });
            throw error;
        }
    }
);

export const searchMedia = createAsyncThunk(
    "media/search",
    async (query) => {

        try {
            const response = await API.get(`media/search`, {
                params: query
            });
            return response.data;
        } catch (error) {
            toast.error(error.response.data?.message || "Something went wrong please try again", { id: "media" });
            throw error;
        }
    }
);



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