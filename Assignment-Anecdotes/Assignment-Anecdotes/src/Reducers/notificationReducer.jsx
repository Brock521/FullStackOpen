import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState:"",
    reducers:{
        setNotifMessage(state,action){

            if(action.payload !== ""){
                console.log("setNotifMessage",action.payload);
                return action.payload;
            }

            return state;
        },

        resetNotifMessage(state, action){
            return "";
        }
    }
})

export default notificationSlice.reducer;
export const {setNotifMessage,resetNotifMessage} = notificationSlice.actions;