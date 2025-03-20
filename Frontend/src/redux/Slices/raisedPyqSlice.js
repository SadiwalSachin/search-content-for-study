import { createSlice } from "@reduxjs/toolkit";

const raisedPyqSlice = createSlice({
    name:"raised-pyq",
    initialState: {
        raisedPyq: []
    },
    reducers:{
        raisePyq:function(state,action){
            state.raisedPyq = [...state.raisedPyq,...action.payload]
        }
    }
})

export const {raisePyq} = raisedPyqSlice.actions
export default raisedPyqSlice.reducer