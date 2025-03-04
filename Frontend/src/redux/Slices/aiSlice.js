import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name:"aiSerach",
    initialState:{
        query:""
    },
    reducers:{
        setAISearch(state,action){
            state.query = action.payload
        }
    }
})

export const {setAISearch} = aiSlice.actions
export default aiSlice.reducer