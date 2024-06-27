import { configureStore } from "@reduxjs/toolkit"
import userSlice from './userslice'
import mediaSlice from "./mediaSlice"
import genreSlice from "./genreSlice"


const store = configureStore({
    reducer: {
        user: userSlice,
        media: mediaSlice,
        genres: genreSlice
    }
})


export default store