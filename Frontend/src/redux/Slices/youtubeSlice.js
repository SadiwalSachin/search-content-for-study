import { createSlice } from "@reduxjs/toolkit";

const youtubeSlice = createSlice({
    name:"ytData",
    initialState:{
        query:"",
        type:""
    },
    reducers:{
        setYtSearch(state,action){
            const {query , contentType} = action.payload
            state.query = query,
            state.type=contentType
        }
    }
})

export const {setYtSearch} = youtubeSlice.actions

export default youtubeSlice.reducer