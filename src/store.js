import { configureStore } from "@reduxjs/toolkit";
import tripReducer from './features/trip/tripSlice'

const store = configureStore({
    reducer: {
        trip: tripReducer
    }
})

export default store;