import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:false,
        accesssToken:""
    },
    reducers:{
        setIsLoggedIn(state,action){
            state.isLoggedIn = action.payload
        },
        setAccessToken(state,action){
            state.accesssToken = action.payload
        },
        logOut(state,action){
            state.accesssToken = "",
            state.isLoggedIn = false
        }
    }
})

export const {setAccessToken , setIsLoggedIn ,logOut} = authSlice.actions
export default authSlice.reducer