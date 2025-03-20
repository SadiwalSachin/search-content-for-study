import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:{},
        isLoggedIn:false
    },
    reducers:{
        setUserData(state,action){
            state.userData = action.payload
        },
        setIsLoggedIn(state,action){
            state.isLoggedIn = action.payload
        },
        setLogOut(state,action){
            state.isLoggedIn = false
        }
    }
})

export const {setUserData,setIsLoggedIn,setLogOut} = userSlice.actions
export default userSlice.reducer