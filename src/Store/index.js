import {configureStore} from'@reduxjs/toolkit';
import passengerReducer from './PassengerSlice';

const store = configureStore({
    reducer:{
        passenger:passengerReducer
      
    }
});

export default store;