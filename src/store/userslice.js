import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    token : null,
    isLoggedIn : false,
    loading : true
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser : (state,action) => {
            state.user = action.payload
        },
        setToken : (state, action) => {
            state.token = action.payload
        },
        setIsLoggedIn : (state, action) => {
            state.isLoggedIn = action.payload
        },
        setLoading : (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setUser, setToken, setIsLoggedIn, setLoading} = userSlice.actions
export default userSlice.reducer