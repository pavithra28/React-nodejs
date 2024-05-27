import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; 


export const loginUser = createAsyncThunk(
    'passenger/loginUser',
    async(email,user_password) => {
        const request = await axios.post('http://localhost:8081/dashboard',
            
                email,
                user_password
            );
        const response = request.data;
        localStorage.setItem('passenger', JSON.stringify(response));
        return response;
   
    }

)

const passengerSlice = createSlice({
    name:'passenger',
    initialState:{
        loading:false,
        passenger:null,
        flights:null,
        error:null
    },
    extraReducers:(builder) =>{
        builder.addCase(loginUser.pending,(state) =>{
            state.loading=true;
            state.passenger=null;
            state.flights=null;
            state.error=null;
        }
    )
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=true;
            state.passenger = action.payload.passenger; // Set user to the payload received from the action
            state.flights = action.payload.flights;
            state.error=null;

        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.passenger=null;
            state.flights=null
            if(action.error.code ==='401'){
                state.error='Oops!Invalid Creds'
            }
            else{
                state.error =action.error.message;
            }
        })
    }
    });
    



export default passengerSlice.reducer;