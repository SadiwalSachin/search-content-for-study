import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
    },
    reducers:{
        setData(state,action){
            const {name , value} = action.payload
            state[name] = value
        }
    }
})

export const {setData} = userSlice.actions
export default userSlice.reducer