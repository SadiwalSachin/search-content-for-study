import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collegeYear:"1",
    subjectCode:"",
    examType:"PYQ",
    examYear:"",
    midSem:"",
    marks:"",
    unit:"",
    branch:"ECE"
}

const pyqSlice = createSlice({
    name:"pyq",
    initialState,
    reducers:{
        setFilter(state,action){
            const {name , value} = action.payload
            state[name] = value
        }
    }
})

export const {setFilter} = pyqSlice.actions

export default pyqSlice.reducer
